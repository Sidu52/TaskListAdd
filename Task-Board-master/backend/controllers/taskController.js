const Tasks = require('../models/tasks');
const TaskList = require('../models/tasksList');

module.exports.createTask = async function(req,res){
    try {
        
        let TASKLIST = await TaskList.findById(req.body.list);
    
        let createdTask = await Tasks.create({
            task:req.body.taskname,
            user:req.user,
            completed:false,
            tasklist:TASKLIST._id
        });
        // console.log(createdTask);
    
    
        TASKLIST.tasklist.push(createdTask);
        await TASKLIST.save();
        return res.status(200).json({
            message:"success",
            data:createdTask
        })
        
    } catch (error) {
        return res.status(404).json({
            message:"error"
        })
    }

}

module.exports.deleteTask = async function(req,res){
    try {
        
        // console.log(req.body);
        // console.log("user creatingtask::",req.user);
        let TASK = await Tasks.findByIdAndDelete(req.body.task);
    
        let TASKLIST = await TaskList.findById(req.body.list);
        await TASKLIST.tasklist.pull(req.body.task)
        await TASKLIST.save()
        await TASKLIST.populate('tasklist');
        return res.status(200).json({
            message:"success",
            data:TASKLIST
        })
    } catch (error) {
        return res.status(404).json({
            message:"error"
        })
    }
}


module.exports.dragging= async function(req,res){
    try {
        
        let TASK = await Tasks.findById(req.body.taskid);
        // console.log("TASK::",TASK);

        let FROMTASKLIST = await TaskList.findById(TASK.tasklist);
        // console.log("FROMTASKLIST=>",FROMTASKLIST)

        let TOTASKLIST = await TaskList.findById(req.body.list);
        // console.log("TOTASKLIST::",TOTASKLIST)
        
        await FROMTASKLIST.tasklist.pull(req.body.taskid);
        await FROMTASKLIST.save();
        await FROMTASKLIST.populate('tasklist')

        TASK.tasklist = req.body.list;
        await TASK.save();

        TOTASKLIST.tasklist.push(TASK);
        await TOTASKLIST.save()
        await TOTASKLIST.populate('tasklist')

        // console.log("after-------------------------")
        // console.log("TASK::",TASK);
        // console.log("FROMTASKLIST=>",FROMTASKLIST)
        // console.log("TOTASKLIST::",TOTASKLIST)



        return res.status(200).json({
            message:"success",
            data:TASK,
            from:FROMTASKLIST,
            to:TOTASKLIST
        })
    } catch (error) {
        return res.status(200).json({
            message:"error while dragging",
        })
    }
}