import { DataTypes, Model } from 'sequelize';
import { sequelizeConfig } from '../connection.js';
import UserModel from './user.model.js';

class PostModel extends Model{}
PostModel.init({
  
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
   
  },{
       sequelize:sequelizeConfig,
       timestamps:true,
       modelName:'Posts',
       freezeTableName:true,
       paranoid:true,
      
  })
  
  // one post belongs to one user

PostModel.belongsTo(UserModel,{foreignKey:'fk_user_id',onDelete:"CASCADE",onUpdate:"CASCADE"})


//one user have many posts 

UserModel.hasMany(PostModel,{foreignKey:"fk_user_id",onDelete:"CASCADE",onUpdate:"CASCADE"})


export default PostModel
