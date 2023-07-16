const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const {hash, compare} = require('bcrypt');


class User extends Model { }

User.init({
    username: {
        type:  DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            min: 5
        }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: 6
      }
    }
  }, {
    sequelize: db,
    modelName: 'user',
    hooks: {
      beforeCreate: async function(user){
        const hashPassword = await hash(user.password, 10);
  
        user.password = hashPassword;
      }
    }
  });


module.exports = User;