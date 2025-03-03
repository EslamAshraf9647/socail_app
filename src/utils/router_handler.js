import { Commentcontroller } from "../modules/comment/comment.controller.js"
import { postController } from "../modules/post/post.controller.js"
import usercontroller from "../modules/user/user.controller.js"




const routerhandler=(app) => {
    app.use('/user',usercontroller)
    app.use('/post',postController)
    app.use('/comment',Commentcontroller)
}


export  default routerhandler