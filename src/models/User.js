const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        // representa uma linha da tabela, uma pessoa
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING
    },
      {
        tableName: 'users',
        timestamps: false,
        underscored: true
      })
  
      User.associate = (models) => {
        User.hasMany(models.BlogPost, { foreignKey: 'user_id' })
      }
  
    return User;
  }
  
  module.exports = UserModel;
