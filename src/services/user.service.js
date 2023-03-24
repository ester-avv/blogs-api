const { User } = require('../models');

const getByUserId = async (userId) => {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    return user;
  };


module.exports = {
  getByUserId,
};