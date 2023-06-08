const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controllers/authcontrollers');
const verifyTOken = require('../middleware/hashPassword');


router.post('/register', authController.authRegister); // register user
router.get('/login', authController.authLogin); // login user
router.post('/token', authController.getToken); // get new access Token
router.delete('/logout', authController.logout); // logout user
router.get('/test', verifyTOken.verifyToken, authController.test);

module.exports = router;
