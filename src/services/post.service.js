const { BlogPost, sequelize, Category, PostCategory, User } = require('../models');

const checkCatId = require('../utils/checkCatId');
// ajuda Gabriel --> nao funciona só com promiseAll, por isso esta listado duas vezes
// ajuda turma 24
const createPost = async (title, content, idsCategories, userId) => {
  const t = await sequelize.transaction();
  const validCat = await checkCatId(idsCategories);
  if (!validCat) return { message: 'one or more "categoryIds" not found' };

  try {
    const published = new Date();
    const newPost = await BlogPost.create(
      { title, content, userId, published, updated: published }, { transaction: t },
    );
  
    await idsCategories.forEach(async (category) => {
      await PostCategory.create({ postId: newPost.id, categoryId: category });
    }, { transaction: t });

    await t.commit();

    return newPost;
  } catch (err) {
    await t.rollback();
    throw err;
  }
};

const getAllPostsOfUser = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return allPosts;
};

const getPostById = async (id) => {
 const postById = await BlogPost.findByPk(id, {
  include: [
    { model: User, as: 'user', attributes: { exclude: 'password' } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
 });
 return postById;
};

const deletePost = async (id, userId) => {
  const posts = await BlogPost.findByPk(id);
  if (posts.dataValues.userId !== userId) {
    return { message: 'Unauthorized user' };
  }
  await BlogPost.destroy({ where: { id } });
};

module.exports = {
  createPost,
  getAllPostsOfUser,
  getPostById,
  deletePost,
};