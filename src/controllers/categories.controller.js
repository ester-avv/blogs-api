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

module.exports = {
    createCategory,
}
