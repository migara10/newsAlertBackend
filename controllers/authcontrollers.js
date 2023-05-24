const authModel = require('../models/userModel') // import authModel
const findUser = async (userData) => {
    const query = { userName: userData.userName };
    const data = await authModel.find(query).maxTimeMS(20000);
    return data;
};

const authRegister = async (req, res) => {
    const data = await findUser(req.body);
    res.send({ category: data });
};

module.exports = {
    authRegister
}