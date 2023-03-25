const Category = (sequelize, DataTypes) => {
    const category = sequelize.define('Category', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      tableName: 'categories',
      underscored: true,
      timestamps: false,
    });
    category.associate = (models) => {
      category.belongsToMany(models.BlogPost, {
        as: 'posts',
        through: 'posts_categories',
        foreignKey: 'categoryId',
        otherKey: 'postId',
      });
    };
  
      return category;
  };
  
  module.exports = Category;