const categoriesService = require('../services/categories.service');

const createCategory = async (req, res) => {
    /* console.log(req.body); */
    const { name } = req.body;
    if (!name) {
        return res.status(400).send({
          message: '"name" is required',
        });
      }
    const creatingNewCateg = await categoriesService.createCategory(name);

    /* console.log('ESSE É O RESULTADO', creatingNewCateg); */

    return res.status(201).send(creatingNewCateg);    
};

const getAllCategories = async (req, res) => {
    const result = await categoriesService.getAllCategories();

   /*  const listCategories = result.map((e)=> { e.id, e.name }) */
      console.log('ESSE É O RESULTADO', result); 
    return res.status(200).json(result);
};

module.exports = {
    createCategory,
    getAllCategories,
};
