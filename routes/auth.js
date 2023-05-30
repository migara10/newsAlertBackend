const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const authController = require('../controllers/authcontrollers');


router.post('/register', authController.authRegister); // register user
router.get('/login', authController.authRegister);

module.exports = router;
