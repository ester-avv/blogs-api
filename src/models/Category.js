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
  
      return category;
  };
  
  module.exports = Category;