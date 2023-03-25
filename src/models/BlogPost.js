const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    id: {
      primaryKey:true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },{
    underscored: true,
    timestamps: false,
    tableName: 'blog_posts',
  });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    blogpost.belongsToMany(models.Category, {
      as: 'categories',
      through: 'posts_categories',
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  }
  return blogpost;
};

module.exports = BlogPost;