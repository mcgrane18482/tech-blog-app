const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

class Post extends Model { }

Post.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3
        }
    }
}, {
    sequelize: db,
    modelName: 'post'
});


module.exports = Post;