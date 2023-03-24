const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

const jwtHeader = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

const secret = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  /* const token = req.headers.authorization; */
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    const user = await userService.getUserById(decoded.data.userId);

    if (!user) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = user;

} 
 catch (err) {
    return res.status(401).json({ message: err.message });
} 
next();
};


// dica mentoria: criar uma forma de pegar o autor pelo token
const userIdByToken = (authorization) => {
    const descriptBody = jwt.verify(authorization, secret);
    const { userId } = descriptBody.data;
    return userId;
  };

module.exports = {
    secret,
    jwtHeader,
    auth,
    userIdByToken,
  };