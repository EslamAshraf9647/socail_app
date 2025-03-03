import { hashSync } from "bcrypt";
import { DataTypes, Model } from "sequelize";
import { sequelizeConfig } from "../connection.js";

    
 class UserModel extends Model{}
 
 
 UserModel.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    Fname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[3,20],
            notEmpty:true
        }
    },
    Lname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[3,20],
            notEmpty:true
        }
    },
    username:{
        type:DataTypes.STRING,
        validate:{
                    notEmpty:true
        },
        
        get(){
            const firstName =this.getDataValue('Fname')
            const lastName =this.getDataValue('Lname')
            return`${firstName} ${lastName}`
        }
    },
    email:{
        type:DataTypes.STRING,
        unique:'idx_email_unique',
        allowNull:false,
        validate:{
            isEmail:true,
            notEmpty:true
        }
    },
    password:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate: {
            checkPasswordLength(value) {
              if (value.length <= 6) {
                throw new Error('Password must be greater than 6 characters.');
              }
            }},
        // set(value){
        //     this.setDataValue('password',hashSync(value,10))
        // },
        
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            checkage(value){
                if(value<18){
                    throw new Error('Age must be greater than 18')
                }
            }
        }
    }, 
    gender:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'other'
    },
    role:{
        type:DataTypes.ENUM('user','admin'),
        defaultValue:'user',
    }

    
    
 },{
    sequelize:sequelizeConfig,
    timestamps:true,
    freezeTableName:true,
    modelName:'Users',
    paranoid:true,
    // hooks: {
    //     beforeCreate: (user, options) => {
    //         if (user.name.length <= 2)
    //             throw new Error("Name must be longer than 2 characters");
    //     }
    // }
    
 })
  
 export default UserModel