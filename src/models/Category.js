const Category = (sequelize, DataTypes) => {
    const category = sequelize.define('Category', {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
    },
    {
      timestamps: false,
      tableName: 'categories',
      underscored: true,
    });
  
      return category;
  };
  
  module.exports = Category;