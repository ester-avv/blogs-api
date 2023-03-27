 const express = require('express');
const userController = require('../controllers/user.controller');
const { validateUser, 
    validateEmail, 
    validateName, 
    validatePassword } = require('../middlewares/validUser');
const { auth } = require('../auth/validateJWT');

const userRouter = express.Router();

userRouter.post('/', 
validateUser, 
validateEmail, 
validateName, 
validatePassword, 
userController.createUser);  

userRouter.get('/', auth, userController.getAllUsers);

userRouter.get('/:id', auth, userController.getUserById);

userRouter.delete('/:id', auth, userController.deleteUser);

module.exports = userRouter; 