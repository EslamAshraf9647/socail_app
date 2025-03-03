import { Router } from "express";
import { GetUserByEmail, GetUserByIDExcludingRole, signUpService, updateService } from "./services/user.service.js";



const usercontroller =Router()
usercontroller.post('/signup',signUpService)
usercontroller.put('/update/:id',updateService)
usercontroller.get('/Email',GetUserByEmail)
usercontroller.get('/id/:id',GetUserByIDExcludingRole)





export default usercontroller