const loginService = require('../services/login.service');

const validateUser = async (req, res, next) => {
  const { email, password, displayName } = req.body;
  const eight = 8;
  const six = 6;
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;

  const existUser = await loginService.login(email, password);

  if (!email || !password || !displayName) {
    return res.status(400).send({
      message: 'Some required fields are missing',
    });
  }
  if (displayName.length < eight) {
    return res.status(400).send({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  if (password.length < six) {
    return res.status(400).send({
      message: '"password" length must be at least 6 characters long',
    });
  }
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: '"email" must be a valid email',
    });
  }
  if(existUser){
    return res.status(409).json({
      message: 'User already registered',
    });
  }
  
  next();
};

module.exports = {
  validateUser,
};