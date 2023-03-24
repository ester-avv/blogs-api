const express = require('express');
const loginController = require('../controllers/login.controller')
const { validateLoginBody } = require('../middlewares/validLoginBody');

const loginRouter = express.Router();

loginRouter.post('/', validateLoginBody, loginController.login)

module.exports = loginRouter;