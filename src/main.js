import express from "express"
import { database_connection } from "./DB/connection.js"
import routerhandler from "./utils/router_handler.js"
import CommentModel from "./DB/models/commnet.model.js"



const bootStrap =async() => {
   
    const app =express()
    app.use(express.json())
    routerhandler(app)
    await database_connection()
    CommentModel



    const port =3000
    app.listen(port,()=> console.log('server is running on port'+port))

}
export default bootStrap