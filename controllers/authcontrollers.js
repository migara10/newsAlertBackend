const authModel = require('../models/userModel') // import authModel
/* authRegister = () => {
    findUser();
} */

const findUser = async (userData) => {
  const data = await authModel.find({}).maxTimeMS(20000);
  console.log(userData);
  return data;
};

const authRegister = async (req, res) => {
  const data = await findUser(req.body);
  console.log(data); // Print the return value
  res.send({ category: data });
};

module.exports = {
    authRegister
}