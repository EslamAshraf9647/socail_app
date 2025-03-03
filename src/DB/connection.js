
import { Sequelize } from "sequelize";



export const sequelizeConfig =new Sequelize('Assignment 7','root','',{
    host:'localhost',
    dialect:'mysql',
})

export const database_connection= async() => {
    try{
        await sequelizeConfig.sync({alter:true , force:false})
        console.log('database connected successfully')

    }
    catch (error){
         console.error('database connected failed',error)
    }

}