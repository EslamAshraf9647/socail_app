import { DataTypes, Model } from "sequelize";
import { sequelizeConfig } from "../connection.js";
import PostModel from "./post.model.js";
import UserModel from "./user.model.js";


class CommentModel extends Model { }

CommentModel.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize:sequelizeConfig,
    modelName: "Comment",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
})

// post has many comments
PostModel.hasMany(CommentModel, {
    foreignKey: "fk_post_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})
// comment belongs to one post
CommentModel.belongsTo(PostModel, {
    foreignKey: "fk_post_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})
// user has many comments
UserModel.hasMany(CommentModel, {
    foreignKey: "fk_user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})
// comment belongs to one user
CommentModel.belongsTo(UserModel, {
    foreignKey: "fk_user_id",
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
})


export default CommentModel