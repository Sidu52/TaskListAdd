const task = require('../module/task');
const list = require('../module/list');

const create = async (req, res) => {
    try {
        const { name, listname } = req.body;
        const List = await list.findOne({ listname });
        const newTask = await task.create({
            task: name,
            completed: false,
            tasklist: List._id
        });
        List.task.push(newTask);
        await List.save();
        res.status(201).json({ message: 'Task created successfully', task: newTask });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task', error });
    }
};


const getAllTask = async (req, res) => {
    try {
        const { taskID } = req.body;
        const fetchedTask = await task.findById(taskID); // Fetch the task using the task ID
        res.status(200).json({ task: fetchedTask }); // Return the fetched task data
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task', error });
    }
};
const changeStatus = async (req, res) => {
    const { taskId, listname } = req.body;
    try {
        await task.findByIdAndDelete(taskId);
        const List = await list.findOne({ listname: listname });
        // Remove the taskId from the tasklist of the previous list
        List.task.pull(taskId);
        await List.save();
        res.status(201).json({ message: 'Task created successfully', task: List });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch task', error });
    }
}

const updateList = async (req, res) => {
    const { taskId, listName } = req.body;
    try {
        const Task = await task.findById(taskId);
        const PrevListId = Task.tasklist;
        const PrevList = await list.findById(PrevListId);
        const List = await list.findOne({ listname: listName });
        // Remove the taskId from the tasklist of the previous list
        PrevList.task.pull(taskId);
        // Add the taskId to the tasklist of the new list
        List.task.push(taskId);

        Task.tasklist = List._id;

        await Task.save();
        await PrevList.save();
        await List.save();

        return res.status(201).json({ List });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update task list', error });
    }
};


module.exports = { create, getAllTask, changeStatus, updateList };
