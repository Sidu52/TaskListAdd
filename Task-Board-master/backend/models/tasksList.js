const mongoose = require('mongoose');

const tasklistSchema = new mongoose.Schema({
    tasklistname:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    tasklist:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Tasks"
    }]
}, {
    timestamps:true
})

const TaskList = mongoose.model("TaskList", tasklistSchema);

module.exports = TaskList;