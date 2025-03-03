import { where } from "sequelize"
import UserModel from "../../../DB/models/user.model.js"


export const signUpService =async(req,res) => {
try{
  const {Fname,Lname,age,password,email,gender,role} =req.body
const isEmailExsist = await UserModel.findOne({where:{email}})
if(isEmailExsist){
    return res.status(400).json({message:'Email is already Exsist'})   
}
const username =`${Fname} ${Lname}`
const data =await UserModel.create({Fname,Lname,email,age,password,gender,role,username})
res.status(200).json({message:'user added successfully',data})
}
catch (error){
    console.log(error)
    res.status(500).json({message:'somthing error',error})

}
   
}


export const updateService =async(req,res) => {
    try{
        const {id} =req.params
        const {Fname,age,email} =req.body
        const data =await UserModel.update({Fname,age,email},{where:{id}})
        res.status(200).json({message:'user updated successfylly',data})
    }
    catch(error){
             console.log(error)
             res.status(500).json({message:'somthing error',error})
    }
}

export const GetUserByEmail =async(req,res) => {
   try{
    const {email}= req.query
    const data =await UserModel.findOne({where:{email}})

    if(!data){
         return res.status(404).json({message:"user not found"})
    }
    res.status(200).json({data})
   }
   catch(error){
                 console.log(error)
        res.status(404).json({message:'user not found',error})
   }
}

export const GetUserByIDExcludingRole =async(req,res) => {
    try{
    const {id} =req.params
    const data =await UserModel.findByPk(id,{
        attributes:{exclude:['role']}
        
    })
    if(!data){
            return res.status(404).json({message:'user not found'})
    }
    res.status(200).json({data})
    }
    catch(error){
console.log(error)
    res.status(500).json({message:'somthing error'})

    }
}