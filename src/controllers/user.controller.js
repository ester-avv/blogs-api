const jwt = require('jsonwebtoken');
const userService = require('../services/user.service'); 
const { secret, jwtHeader, IdByToken } = require('../auth/validateJWT');

// req 4 criar user tem que fazer o sign 
 const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    
    const result = await userService.createUser(displayName, email, password, image);

    const newUserById = result.dataValues.id;

    const token = jwt.sign({ 
        data: { userId: newUserById }, 
      }, secret, jwtHeader); 
    
      return res.status(201).send({ token });
 };

 const getAllUsers = async (req, res) => {
    const usersList = await userService.getAllUsers();
    return res.status(200).json(usersList);
 };

 const getUserById = async (req, res) => {
    const { id } = req.params;
    const userId = id;
    const user = await userService.getUserById(userId);
    if (!user) {
        return res.status(404).json({ message: 'User does not exist' });
    }
    return res.status(200).json(user);
 };

 const deleteUser = async (req, res) => {
    const { authorization } = req.headers;
    const userId = IdByToken(authorization);

    await userService.deleteUser(userId);
    return res.status(204).end();
 };

module.exports = { 
    createUser,
    getAllUsers,
    deleteUser,
    getUserById,
};