const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontrollers')


router.get('/login', authController.authRegister);

module.exports = router;