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

/* const findUser = async (userData) => {
  const query = {userName: userData.userName};
  const data = await authModel.findOne(query);
  return data;
}; */

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
const authLogin = async (req,res, next) => {
  try {
    const existingUser = await hashPassword.findUser(req.body);

    if (existingUser) {
      // return res.status(200).send({error: 'User already exists'});
      // console.log(existingUser, 'valid user');
      hashPassword.decriptPassword(req.body.password,existingUser.password, (err,found) => {
        if(err) throw err
        if(found) console.log(found, 'migara')
        if(!found) console.log('migara1')
        next();
      })
    } else {
      const savedUser = await createUser(req.body);
      res.status(400).send({
        message: 'Can\'t found valid user',
        user: savedUser,
      });
    }
  } catch (error) {
    const newErr = handleErrors(error);
    res.status(500).send({error: newErr});
  }
}

module.exports = {
  authRegister,
  authLogin,
};
