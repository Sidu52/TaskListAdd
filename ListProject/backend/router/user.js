const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../config/isAuthentication');

const { create, login, loginPage, home, Singout } = require('../controllers/usercontroller');

router.get('/', isAuthenticated, home);
router.post('/create', create);
router.post('/login', login);
router.post('/loginPage', loginPage);
router.post('/logout', Singout);

module.exports = router;
