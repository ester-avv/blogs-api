const loginService = require('../services/login.service');

const validateEmail = async (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  next();
};

const validateName = async (req, res, next) => {
  const { displayName } = req.body;
  const eight = 8;

  if (displayName.length < eight) {
    return res.status(400).send({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const validatePassword = async (req, res, next) => {
  const { password } = req.body;

  const six = 6;
  if (password.length < six) {
    return res.status(400).send({
      message: '"password" length must be at least 6 characters long',
    });
  }
  next();
};

const validateUser = async (req, res, next) => {
  const { email, password, displayName } = req.body;

  const existUser = await loginService.login(email, password);

  if (!email || !password || !displayName) {
    return res.status(400).send({
      message: 'Some required fields are missing',
    });
  }
  if (existUser) {
    return res.status(409).json({
      message: 'User already registered',
    });
  }
  
  next();
};

module.exports = {
  validateUser,
  validatePassword,
  validateEmail,
  validateName,
};