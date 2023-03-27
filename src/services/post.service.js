const { Op } = require('sequelize');
const { BlogPost, sequelize, Category, PostCategory, User } = require('../models');

const checkCatId = require('../utils/checkCatId');
// ajuda Gabriel --> tem que usar promiseAll no check das categorias
// ajuda turma 24
const createPost = async (title, content, idsCategories, userId) => {
  const t = await sequelize.transaction();
  const validCat = await checkCatId(idsCategories);
  if (!validCat) return { message: 'one or more "categoryIds" not found' };
// usando try e catch com transaction 
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

const searchPost = async (searchTerm) => {
  // usando o findAll vai retornar todos se a busca é vazia
  const foundPost = await BlogPost.findAll({
    where: { 
      [Op.or]: [
        { title: { [Op.substring]: searchTerm } },
        { content: { [Op.substring]: searchTerm } },
      ],
    },
    include: [
      { model: Category, as: 'categories', through: { attributes: [] } },
      { model: User, as: 'user', attributes: { exclude: 'password' } },
    ],
  });

  return foundPost;
};

module.exports = {
  createPost,
  getAllPostsOfUser,
  getPostById,
  deletePost,
  searchPost,
};