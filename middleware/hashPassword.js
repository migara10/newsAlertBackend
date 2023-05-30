const authModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

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

module.exports = {
  encryptPassword,
  findUser,
  decriptPassword,
};
