const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean
    },
    tasklist: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;