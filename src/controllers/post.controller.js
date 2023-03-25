const postService = require('../services/post.service');
const { IdByToken } = require('../auth/validateJWT');

const createPost = async (req, res) => {
    const { title, content, categoryIds } = req.body;
    const { authorization } = req.headers;
    const userId = IdByToken(authorization);

    if (!title || !content) {
        return res.status(400).send({
          message: 'Some required fields are missing',
        });
      }
      
    const creatingNewPost = await postService.createPost(title, content, categoryIds, userId);

    if (creatingNewPost.message) {
      return res.status(400).json({ message: 'one or more "categoryIds" not found' });
    }

    return res.status(201).send(creatingNewPost);    
};

const getAllPostsOfUser = async (req, res) => {
    const result = await postService.getAllPostsOfUser(); 
    return res.status(200).json(result);
};

module.exports = {
  createPost,
  getAllPostsOfUser,
};
