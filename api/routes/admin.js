const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.validation.middleware');
const user = require('../controller/UserController');


router.post('/register', user.register);
router.post('/login', user.login);


module.exports = router;