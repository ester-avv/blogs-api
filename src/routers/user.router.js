 const express = require('express');
const userController = require('../controllers/user.controller');
const { validateUser } = require('../middlewares/validUser');
const { auth } = require('../auth/validateJWT');

const userRouter = express.Router();

userRouter.post('/', validateUser, userController.createUser);  

userRouter.get('/', auth, userController.getAllUsers);

module.exports = userRouter; 