import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { addCommentToPost } from '../controllers/commentController.js'

const commentRouter = express.Router()

commentRouter.post('/comment/add-comment', authenticate, addCommentToPost)

export default commentRouter
