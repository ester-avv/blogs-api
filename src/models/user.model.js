const User = (sequelize, DataTypes) => {
    const user = sequelize.define('User', {
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
  
      user.associate = (models) => {
        user.hasMany(models.BlogPost, { 
            //1:N
          foreignKey: 'user_id'
        })
      }
  
    return user;
  }
  
  module.exports = User;
