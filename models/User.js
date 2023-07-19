const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const {hash, compareSync} = require('bcrypt');

class User extends Model { 
validatePass(pw){
  return  compareSync(pw, this.password)
}
}

User.init({
    userName: {
        type:  DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            min: [4]
        }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: [6]
      }
    }
  }, {
    sequelize: db,
    modelName: 'user',
    hooks: {
      beforeCreate: async function(user){
        user.password = await hash(user.password, 10);
  
       return user.password
      }
    }
  });

// User.prototype.validatePass = async function(formPassword) {
//   const isValid = await compare(formPassword, this.password);
//   return isValid;
// }


module.exports = User;