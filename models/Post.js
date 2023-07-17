const { Model, DataTypes } = require('sequelize');


class Post extends Model { }

Post.init({
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