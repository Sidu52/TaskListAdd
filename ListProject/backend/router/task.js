const express = require('express');
const router = express.Router();

const { create, getAllTask, changeStatus, updateList } = require('../controllers/taskcontroller');

router.post('/', create);
router.post('/getAllTask', getAllTask);
router.post('/changeStatus', changeStatus);
router.post('/updateList', updateList);

module.exports = router;