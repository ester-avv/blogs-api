const PostCategory = (sequelize, DataTypes) => {
    const postcategory = sequelize.define('PostCategory', {
      postId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'BlogPost',
          key: 'id'
        },
      },
      categoryId: {
        foreignKey: true,
        type: DataTypes.INTEGER,
        references: {
          model: 'Categories',
          key: 'id'
        },
      },
    },
      {
        tableName: 'posts_categories',
        timestamps: false,
        underscored: true
      });
  
    postcategory.associate = (models) => {
      models.BlogPost.belongsToMany(models.Category, {
        as: 'blog_posts',
        through: postcategory,
        foreignKey: 'postId',
        otherKey: 'categoryId',
      });
      models.Category.belongsToMany(models.BlogPost, {
        as: 'categories',
        through: postcategory,
        foreignKey: 'categoryId',
        otherKey: 'postId'
      })
    }
    return postcategory;
  }
  
  module.exports = PostCategory;