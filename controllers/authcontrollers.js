const authModel = require('../models/userModel') // import authModel
const findUser = async (userData) => {
    const query = { userName: userData.userName };
    const data = await authModel.find(query).maxTimeMS(90000); // Increased timeout to 30 seconds
    return data;

};

const authRegister = async (req, res) => {
    try {
        const data = await findUser(req.body);
        res.send({ category: data });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
    }
};

module.exports = {
    authRegister
}