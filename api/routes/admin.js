const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.validation.middleware');
const admin = require('../controller/AdminController');


router.post('/register', admin.register);
router.post('/login', admin.login);

router.get('/getForm', auth.auth, admin.getFormAllUser);
module.exports = router;