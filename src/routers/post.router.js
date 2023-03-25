 const express = require('express');
const postController = require('../controllers/post.controller');
const { auth } = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.post('/', auth, postController.createPost);

/* postRouter.get('/', auth, postController.getAllCategories);  */

module.exports = postRouter; 