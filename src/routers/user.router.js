 const express = require('express');
const userController = require('../controllers/user.controller')
const { validateUser } = require('../middlewares/validUser');

const userRouter = express.Router();

userRouter.post('/', validateUser, userController.createUser)  

module.exports = userRouter; 