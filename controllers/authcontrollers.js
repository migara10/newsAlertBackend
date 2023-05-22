const authModel = require('../models/userModel') // import authModel
/* authRegister = () => {
    findUser();
} */

authRegister =  async (req, res) => {
    /* const query = { firstName: 'migara' }
    const data = await authModel.find({}); */
    res.send({category: 'migara123'});
    
}
/* findUser =  async (req, res) => {
    const data = await authModel.find({});
    res.send({category: data});
    
} */

module.exports = {
    authRegister
}