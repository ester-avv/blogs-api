const { BlogPost, sequelize, Category, PostCategory, User } = require('../models');

// ajuda Gabriel --> nao funciona só com promiseAll, por isso esta listado duas vezes
const createPost = async (title, content, categoryIds, userId) => {
  const t = await sequelize.transaction();
  const post = await BlogPost.create({ 
    title, content, userId, updated: Date.now(), published: Date.now(),
   }, { transaction: t });
 /*   const allCategories = await Category.findAll();
   const categIdList = allCategories.map(({ id: did }) => did);
   if (!categoryIds.every((id) => categIdList.includes(id))) {
     return { type: 400, message: '"categoryIds" not found' };
   }  */
   const promises = categoryIds.map((id) => Category.findOne({ where: { id } }));
  const r = await Promise.all(promises);
   if (r.some((e) => e == null)) { return { message: '"categoryIds" not found' }; } 
   const result = categoryIds
   .map((id) => PostCategory.create({ categoryId: id, postId: post.id }, { transaction: t }));
   await Promise.all(result);
   t.commit();
  return post;
};

const getAllPostsOfUser = async () => {
  const allPosts = await BlogPost.findAll({
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
  });
  return allPosts;
};

module.exports = {
  createPost,
  getAllPostsOfUser,
};