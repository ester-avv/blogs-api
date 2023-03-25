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

const getPostById = async (req, res) => {
  const { id } = req.params;
  const result = await postService.getPostById(id);
  if (!result) {
    return res.status(404).json({ message: 'Post does not exist' });
  }
  return res.status(200).json(result);
};

const deletePost = async (req, res) => {
  const { authorization } = req.headers;
  const userId = IdByToken(authorization);
  const { id } = req.params;
  const postId = id;

  const existPost = await postService.getPostById(postId);

  if (!existPost) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  if (existPost.dataValues.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }
  
 await postService.deletePost(postId, userId);

  return res.status(204).end() 
};

module.exports = {
  createPost,
  getAllPostsOfUser,
  getPostById,
  deletePost,
};
