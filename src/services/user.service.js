const { User } = require('../models');

const getUserById = async (userId) => {
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

  const getAllUsers = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
  return users;
  };

module.exports = {
  getUserById,
  createUser,
  getAllUsers,
};