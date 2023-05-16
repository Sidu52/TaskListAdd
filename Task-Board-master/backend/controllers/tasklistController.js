const User = require('../models/user');
const TaskList = require('../models/tasksList');

module.exports.createTaskList = async function(req,res){
    try {
        
        const userindb = await User.findById(req.user);
        // console.log(userindb); 
        const createdList = await TaskList.create({tasklistname:req.body.tasklistname,
            user:userindb._id
        });
        console.log(createdList);
    
            userindb.list.push(createdList);
        await userindb.save();
        
        return res.status(200).json({
            message:"success",
            data:createdList
        })
        
    } catch (error) {
        return res.status(404).json({
            message:"error"
        })
    }
}