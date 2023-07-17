const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const {hash, compare} = require('bcrypt');
const Post = require('./Post');


class User extends Model {
  validatePass(formPassword) {
    return bcrypt.compareSync(formPassword, this.password);
  }
 }

User.init({
    userName: {
        type:  DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            min: 5
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
    freezeTableName: true,
    hooks: {
      async beforeCreate(userData){
        userData.password = await bcrypt.has(userData.password, 10);
        return userData;
      }
    }
  });

module.exports = User;