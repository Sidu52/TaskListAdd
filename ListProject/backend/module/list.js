const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    listname: {
        type: String,
        required: true
    },
    task: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "task"
    }]
}, {
    timestamps: true
})

const List = mongoose.model("List", ListSchema);
module.exports = List;
