import { Router } from "express";
import {getPostData,  DeletePost, GetAllPosts, getPostCommentCount}  from "./services/post.service.js";
  export const postController =Router()

postController.post('/posts',getPostData)
postController.delete('/delete/:id',DeletePost)
postController.get('/get',GetAllPosts)
postController.get('/count',getPostCommentCount)