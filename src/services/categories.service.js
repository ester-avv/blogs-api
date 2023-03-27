const { Category } = require('../models');

const getCategoryById = async (id) => {
  const category = await Category.findByPk(id);
  return category;
};

const createCategory = async (name) => {
  const newCategory = await Category.create({ name });
  return newCategory;
};

const getAllCategories = async () => {
  const allCategories = await Category.findAll();
  return allCategories;
};

module.exports = {
  getCategoryById,
  createCategory,
  getAllCategories,
};