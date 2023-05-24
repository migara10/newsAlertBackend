const authModel = require('../models/userModel') // import authModel
const findUser = async (userData) => {
    try {
        const query = { userName: userData.userName };
        const data = await authModel.find(query).maxTimeMS(10000); // Increased timeout to 30 seconds
        return data;
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal server error' });
        return null;
    }

};

const authRegister = async (req, res) => {
    const data = await findUser(req.body);
    res.send({ category: data });
};

module.exports = {
    authRegister
}