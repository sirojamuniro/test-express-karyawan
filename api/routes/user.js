const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth.validation.middleware');
const user = require('../controller/UserController');



router.post('/register', user.register);
router.post('/login', user.login);

router.post('/registerBiodata', auth.auth, user.registerBiodata);
router.get('/biodata', auth.auth, user.getMyBiodata);


module.exports = router;