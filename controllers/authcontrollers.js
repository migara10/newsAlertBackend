const authModel = require('../models/userModel');
const hashPassword = require('../middleware/hashPassword');

const handleErrors = (err) => {
  if (err.message.includes('userauths validation failed')) {
    const newErr = Object.values(err.errors);
    for (const error of newErr) {
      return error.message;
    }
  };
};

const findUser = async (userData) => {
  const query = {userName: userData.userName};
  const data = await authModel.findOne(query);
  return data;
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
    const existingUser = await findUser(req.body);

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

module.exports = {
  authRegister,
};
