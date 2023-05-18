const list = require('../module/list');

const create = async (req, res) => {
    // Create a new task
    try {
        const { name } = req.body; // Assuming the name input is in the request body
        const List = await list.findOne({ listname: name });

        if (!List) {
            // Create a new task using the Task model
            const newTask = await list.create({
                listname: name
            });
            // Save the task to the database
            await newTask.save();
            return res.status(200).json({ message: 'List Created Successfully', task: newTask });
        }
        return res.status(201).json({ message: 'List Already Created' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create task', });
    }
}

const allList = async (req, res) => {
    try {
        // Find all lists
        const Lists = await list.find();
        res.status(200).json({
            message: 'Lists retrieved successfully',
            lists: Lists
        });
    } catch (error) {
        res.status(500).json({ error: `Failed to retrieve lists ${error}` });
    }
};

module.exports = { create, allList };