const { getCategoryById } = require('../services/categories.service');

const checkCatId = async (idsCategories) => {
    const allCatById = idsCategories.map((id) => getCategoryById(id));
    const checkedIds = await Promise.all(allCatById);
    const allIdsExists = checkedIds.every((id) => id !== null);
    return allIdsExists;
  };

  module.exports = checkCatId;