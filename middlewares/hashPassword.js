const bcrypt = require('bcryptjs');

const encriptPassword = async (password) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      return hash;
    } catch (err) {
      throw err;
    }
  };

module.exports = {
    encriptPassword
}