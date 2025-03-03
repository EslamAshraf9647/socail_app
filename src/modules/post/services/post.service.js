import CommentModel from "../../../DB/models/commnet.model.js" 
import PostModel from "../../../DB/models/post.model.js"
import UserModel from "../../../DB/models/user.model.js"
import { sequelizeConfig } from "../../../DB/connection.js"


 export const getPostData = async (req, res) => {
    try {
        const {title , fk_user_id,content}= req.body
        if(!content || !fk_user_id || !title)
            return res.status(400).json({message:'All data must be required'})

       const postdata= await PostModel.create({title,content,fk_user_id})

        res.status(200).json({
            message:'post created successfully',
            data:postdata,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: "Server error try later..."
        })
    }
}

export const DeletePost =async(req,res) => {
    try{
        const id= req.params
       
        const post = await PostModel.findByPk(id)
        console.log("post is ====>",post)
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        const userId = req.body.user_id
        
        if(post.fk_user_id !== userId){
            res.status(403).json({message:"You are not authorized to delete this post"})
        }
         await PostModel.destroy({truncate:true})
        res.status(200).json({
            message:"post deleted successfully"
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:"server error try later",
            error,
        })

    }
}

export const GetAllPosts =async(req,res) => {
    try{
        const postdata = await PostModel.findAll({
            attributes:['id','title'],
            include:[
                {
                    model:UserModel,
                    attributes:['id','Fname']
                },
                {
                    model:CommentModel,
                    attributes:['id','content']
                }
            ],
            
            
            })
            res.status(500).json({
                message:'Posts retrieved successfully',
                data:postdata
            })
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:'server error please try agian later'})
    }


}

export const getPostCommentCount = async (req, res) => {
    try {
        const postCommentCount = await PostModel.findAll({
            attributes: [
                "id",
                "title",
                [sequelizeConfig.fn("COUNT", sequelizeConfig.col("fk_post_id")), "commentCount"]
            ],
            include: [
                {
                    model: CommentModel,
                    attributes: []
                }
            ],
            group: ["id"],
            raw: true,
        })
        res.status(200).json({
            message: "Posts and comment count retrieved successfully",
            data: postCommentCount,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            Error: "Server error try later..."
        })
    }
}