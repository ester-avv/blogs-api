const { User } = require('../models');

//metodo findOne -> https://sequelize.org/docs/v6/core-concepts/model-querying-finders/

const login = async (email, _password) => {
 const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
  if (user) {
    return user;
  }
};

module.exports = {
  login,
};