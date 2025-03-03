import { Router } from "express";
import { commentDetails, createBulkComment, findOrCreate, newestComment, searchWithWord, updateComment } from "./services/comment.service.js";
 export const Commentcontroller= Router()

Commentcontroller.patch('/update/:id',updateComment)
Commentcontroller.post('/find',findOrCreate)
Commentcontroller.get('/allcomments/:id',commentDetails)
Commentcontroller.get('/newest/:id',newestComment)
Commentcontroller.get('/word',searchWithWord)
Commentcontroller.get('/bulk',createBulkComment)