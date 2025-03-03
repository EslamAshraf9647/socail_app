import CommentModel from "../../../DB/models/commnet.model.js";
import UserModel from "../../../DB/models/user.model.js";
import PostModel from "../../../DB/models/post.model.js";
import { Op } from "sequelize";


 export const updateComment = async (req, res) => {
    try {
        const { user_id, content } = req.body;
        const{ id }= req.params
        if (!user_id || !content)
            return res.status(400).json({
                message: "All data must be required."
            })
        const comment = await CommentModel.findByPk(id)
        if (!comment)
            return res.status(404).json({
                message: "comment not found"
            })
        if (comment.fk_user_id !== user_id) {
            return res.status(401).json({
                message: "you are not authoried to update this comment"
            })
        }
        comment.content = content
        await comment.save()
        res.status(200).json({
            message: "comment updated successfully",
            comment
        })
    } catch (error) {
        console.log("Error ===>", error);
        res.status(500).json({
            error: "server error try later"
        })
    }
}



 export const findOrCreate = async (req, res) => {
    try {
        const { fk_post_id, fk_user_id, content } = req.body
        if (!fk_post_id || !fk_user_id || !content) {
            return res.status(400).json({
                message: "all data are required.."
            })
        }
        const comment = await CommentModel.findAll({
            where: {
                fk_post_id,
                fk_user_id,
                content
            }
        })
        if (comment.length === 0) {
            const newComment = CommentModel.build({
                fk_post_id,
                fk_user_id,
                content
            })
            await newComment.save()
            return res.status(201).json({
                newComment,
                created: "true"
            })
        }
        return res.status(200).json({
            comment,
            created: "false"
        })
    } catch (error) {
        console.log("Error ==> ", error)
        res.status(500).json({
            error: "server error try later"
        })
    }
}



export const commentDetails = async (req, res) => {
    try {
        const {id} = req.params
        const comment = await CommentModel.findByPk(id, {
            attributes: ["id", "content"],
            include: [
                {
                    model: UserModel,
                    attributes: ["id", "Fname", ]
                },
                {
                    model: PostModel,
                    attributes: ["id", "title", "content"]
                }
            ]
        })
        if (!comment) {
            return res.status(404).json({ message: "Comment not found." });
        }
        res.status(200).json({
            message: "Comment retrieved successfully.",
            comment
        });
    } catch (error) {
        console.log("Error ==> ", error)
        res.status(500).json({
            error: "server error try later"
        })
    }
}



 export const newestComment = async (req, res) => {
    try {
        const {id} =req.params
        const post = await CommentModel.findAll({
            where: { fk_post_id: id },
            order: [["createdAt", "DESC"]],
            limit: 3
        })
        if (post.length === 0) {
            return res.status(404).json({
                message: "no comment yet"
            })
        }
        res.status(200).json({
            post
        })

    } catch (error) {
        console.log("Error ==> ", error)
        res.status(500).json({
            error: "server error try later"
        })
    }
}



 export const searchWithWord = async (req, res) => {
    try {
        const searchWord = req.query.word
        if (!searchWord) {
            return res.status(400).json({ message: "Please provide a word to search for." });
        }
        const comments = await CommentModel.findAll({
            where: {
                content: {
                    [Op.like]: `%${searchWord}%`
                }
            }
        });
        if (comments.length === 0) {
            return res.status(404).json({
                message: `The search word ${searchWord} no comments found`
            })
        }
        const count = await CommentModel.count({
            where: {
                content: {
                    [Op.like]: `%${searchWord}%`
                }
            }
        });
        res.status(200).json({
            message: `Found ${count} comments containing the word (${searchWord}).`,
            comments
        });
    } catch (error) {
        console.log("Error ==> ", error)
        res.status(500).json({
            error: "server error try later"
        })
    }
}


 export const createBulkComment = async (req, res) => {
    try {
        const { comments } = req.body;
        if (!Array.isArray(comments) || comments.length === 0)
            return res.status(401).json({
                message: "Must creat a comment to post it.."
            })
        const createComment = await CommentModel.bulkCreate(comments);
        res.status(201).json({
            message: "Comments created successfully.",
            createComment
        })
    } catch (error) {
        console.log("Error server ", error)
        res.status(500).json({
            message: "Server error try later.."
        })
    }
}
