const jwt = require('jsonwebtoken');
const User = require('../models/user');




// signing up
module.exports.signup = async function(req,res){
    try{
        console.log(req.body);
        const user =await User.findOne({username:req.body.username});
    
        if(user){
            return res.status(200).json({
                message:"User alredy exist"
            })
        }
    
        if(req.body.password != req.body.confirmpassword){
            return res.status(200).json({
                message:"Password and confirm password do not match"
            })
        }
    
        const createduser = await User.create(req.body);
        // console.log(createduser);
    
        return res.status(200).json({
            message:"user created"
        })

    }catch(error){
        return res.status(404).json({
            message:"error"
        })
    }
}



module.exports.home = async function(req,res){
    console.log(req.user)
    let user = await User.findById(req.user);
    await (await user.populate('list')).populate({path:'list',populate:{path:'tasklist'}})
    // console.log(user)
    let newlist =[]
    let arraylist = user.list.map((data)=>newlist.push(data.tasklistname))
    // console.log(newlist);
    if(user){
        let {username, list} = user;
        return res.status(200).json({
            message:{
                username,list,newlist
            }
        })
    }

    return res.status(200).json({
        message:"error"
    })

}


module.exports.signin =async function(req,res){
    try {
        let user = await User.findOne({username:req.body.username});
        if(user){
            if(user.password != req.body.password){
                return res.status(422).json({message:"error"})
            }
            const token = jwt.sign({id:user.id},"gameison",{ expiresIn: '1d' })
            // console.log(token);
            
            res.set("authorization",token);
            user.password = undefined;
            return res.status(200).json({
                message:{
                    user:user,
                    token:token
                }
            })
        }
        
    } catch (error) {
        return res.status(404).json({
            message:"error"
        })
    }
    
}
