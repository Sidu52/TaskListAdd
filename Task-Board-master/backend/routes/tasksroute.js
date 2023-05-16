const express = require('express');
const router = express.Router();
const taskListController = require('../controllers/tasklistController');
const {verifyToken} = require('../config/auth');




router.post('/createtasklist', verifyToken,taskListController.createTaskList);








module.exports = router;