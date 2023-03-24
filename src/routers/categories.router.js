 const express = require('express');
const categoriesController = require('../controllers/categories.controller');
const { auth } = require('../auth/validateJWT');

const categoriesRouter = express.Router();

categoriesRouter.post('/', auth, categoriesController.createCategory);

/* categoriesRouter.get('/:id', auth, categoriesController.getUserById); */

module.exports = categoriesRouter; 