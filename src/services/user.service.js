const { User } = require('../models');

const getByUserId = async (userId) => {
    const user = await User.findByPk(userId, { attributes: { exclude: ['password'] } });
    return user;
  };

  const createUser = async (displayName, email, password, image) => {
    const user = await User.findOne({ where: { email }, attributes: { exclude: ['password'] } });
    
    if (!user) {
    const newUser = await User.create({ displayName, email, password, image });
      return newUser;
    }

    if (user) {
      return email;
    }
  };

module.exports = {
  getByUserId,
  createUser,
};