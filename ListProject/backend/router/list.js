const express = require('express');
const router = express.Router();

const { create, allList } = require('../controllers/listcontroller');

router.post('/', create);
router.get('/', allList);

module.exports = router;