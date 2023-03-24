 const loginService = require('../services/login.service'); 
const jwt = require('jsonwebtoken');
const { secret, jwtHeader } = require('../auth/validateJWT');


const login = async (req, res) => {
  const { email, password } = req.body;
  console.log('meu body', req.body);

  const loginUser = await loginService.login(email, password);

  if (!loginUser) {
    return res.status(400).send({ message: 'Invalid fields' });
  }
/* console.log('esse é o loginUser', loginUser); */
 // autorização (jwt.sign)
    const token = jwt.sign({ 
    data: { userId: loginUser.id } 
  }, secret, jwtHeader); 

  return res.status(200).send({ token });
};



module.exports = {
  login,
};