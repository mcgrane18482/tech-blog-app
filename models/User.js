const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const {hash, compare} = require('bcrypt');
const Post = require('./Post');


class User extends Model { }

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
    hooks: {
      beforeCreate: async function(user){
        const hashPassword = await hash(user.password, 10);
  
        user.password = hashPassword;
      }
    }
  });

User.prototype.validatePass = async function(formPassword) {
  const isValid = await compare(formPassword, this.password);
  return isValid;
}

// Associating posts to users
User.hasMany(Post);
Post.belongsTo(User);

module.exports = User;