const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const {verifyToken} = require('../config/auth');




router.get('/',verifyToken ,UserController.home);
router.post('/signin', UserController.signin );
router.post('/signup', UserController.signup)
router.use('/tasklist', require('./tasksroute.js'))
router.use('/task', require('./tasks.js'))








module.exports = router;