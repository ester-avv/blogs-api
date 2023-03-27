 const express = require('express');
const postController = require('../controllers/post.controller');
const { auth } = require('../auth/validateJWT');

const postRouter = express.Router();

postRouter.get('/search', auth, postController.searchPost);

 postRouter.post('/', auth, postController.createPost); 

 postRouter.get('/', auth, postController.getAllPostsOfUser); 

 postRouter.get('/:id', auth, postController.getPostById); 

 postRouter.delete('/:id', auth, postController.deletePost);

module.exports = postRouter; 