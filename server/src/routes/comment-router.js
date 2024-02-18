import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import {
  addCommentToPost,
  deleteComment,
  getPostComments
} from '../controllers/commentController.js'

const commentRouter = express.Router()

commentRouter.post('/comment/add-comment', authenticate, addCommentToPost)
commentRouter.get(
  '/comment/get-post-comments/:id',
  authenticate,
  getPostComments
)
commentRouter.delete('/comment/delete-comment/:id', authenticate, deleteComment)

export default commentRouter
