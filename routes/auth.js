const express = require('express');
const router = express.Router();
const authController = require('../controllers/authcontrollers')


router.post('/register', authController.authRegister); // register user
router.get('/register', authController.getAllData);

module.exports = router;