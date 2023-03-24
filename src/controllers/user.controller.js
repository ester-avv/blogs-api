const userService = require('../services/user.service'); 
const jwt = require('jsonwebtoken');
const { secret, jwtHeader } = require('../auth/validateJWT');

//req 4 criar user
 const createUser = async (req, res) => {
    const { displayName, email, password, image } = req.body;
    
    const result = await userService.createUser(displayName, email, password, image);

    const newUserById = result.dataValues.id;

    const token = jwt.sign({ 
        data: { userId: newUserById } 
      }, secret, jwtHeader); 
    
      return res.status(201).send({ token });

 };

module.exports = { 
    createUser,
};