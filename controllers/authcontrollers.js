/* eslint-disable max-len */
const authModel = require('../models/userModel');
const tokenModel = require('../models/tokenModel');
const hashPassword = require('../middleware/hashPassword');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // config env

const handleErrors = (err) => {
  if (err.message.includes('userauths validation failed')) {
    const newErr = Object.values(err.errors);
    for (const error of newErr) {
      return error.message;
    }
  };
};

const createUser = async (userData) => {
  try {
    userData.password = await hashPassword.encryptPassword(userData.password);
    const savedUser = await authModel.create(userData);
    return savedUser;
  } catch (error) {
    console.error('Error saving user:', error);
    throw error;
  }
};

const authRegister = async (req, res) => {
  try {
    const existingUser = await hashPassword.findUser(req.body);

    if (existingUser) {
      return res.status(400).send({error: 'User already exists'});
    } else {
      const savedUser = await createUser(req.body);
      res.status(200).send({
        message: 'User created successfully',
        user: savedUser,
      });
    }
  } catch (error) {
    const newErr = handleErrors(error);
    res.status(500).send({error: newErr});
  }
};
const authLogin = async (req, res, next) => {
  try {
    const existingUser = await hashPassword.findUser(req.body);

    if (existingUser) {
      hashPassword.decryptPassword(req.body.password, existingUser.password, async (err, found) => {
        if (err) throw err;
        if (found) {
          const userPayload = {user: existingUser.userName};
          const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN, {expiresIn: '10s'});
          const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN, {expiresIn: '120s'});
          try {
            await tokenModel.create({refreshToken});
            res.status(200).send({
              message: 'Login successfully',
              accessToken,
              refreshToken,
            });
          } catch (error) {
            console.error('Failed to save refresh token:', error);
            res.status(500).send({error: 'Failed to save refresh token'});
          }
        }
        if (!found) {
          res.status(400).send({
            message: 'Password Not Match!',
          });
        }
      });
    } else {
      await createUser(req.body);
      res.status(400).send({
        message: 'Can\'t found valid user',
      });
    }
  } catch (error) {
    const newErr = handleErrors(error);
    res.status(500).send({error: newErr});
  }
};

const getToken = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (refreshToken == null) res.sendStatus(401);
  try {
    const refreshTokenDoc = await tokenModel.findOne({refreshToken});
    if (!refreshTokenDoc) {
      return res.sendStatus(403);
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      const userPayload = {user: user.user};
      const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN, {expiresIn: '10s'});
      res.status(200).send({accessToken});
    });
  } catch (error) {
    console.error('Error retrieving refresh token:', error);
    res.status(500).send({error: 'Failed to retrieve refresh token'});
  }
};

const logout = async (req, res) => {
  const refreshToken = req.body.refreshToken;
  try {
    await tokenModel.deleteOne({refreshToken});
    res.status(204).send({message: 'Logged out successfully'});
  } catch (error) {
    console.error('Error deleting refresh token:', error);
    res.status(500).send({error: 'Failed to delete refresh token'});
  }
};

const test = (req, res) => {
  const user = req.user;
  res.json(user);
};

module.exports = {
  authRegister,
  authLogin,
  test,
  getToken,
  logout,
};
