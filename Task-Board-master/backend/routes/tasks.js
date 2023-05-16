const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const {verifyToken} = require('../config/auth');




router.post('/createTask',verifyToken ,TaskController.createTask);
router.post('/deleteTask',verifyToken ,TaskController.deleteTask);
router.post('/dragging', verifyToken, TaskController.dragging);










module.exports = router;