const authModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // config env

const encryptPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw err;
  }
};

const findUser = async (userData) => {
  try {
    const query = { userName: userData.userName };
    const data = await authModel.findOne(query);
    return data;
  } catch (err) {
    throw err;
  }
};

const decriptPassword = async (password, hash, callback) => {
  bcrypt.compare(password, hash, (err, res) => {
    if (err) throw err
    if (res) {
      callback(null, res)
    }
    if (!res) {
      callback(null)
    }
  });
}

const verifyToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.startsWith('bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    if (token == null) res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) res.sendStatus(403);
      req.user = user;
      next();
    })
  } else {
    res.sendStatus(401);
  }
}

module.exports = {
  encryptPassword,
  findUser,
  decriptPassword,
  verifyToken,
};
