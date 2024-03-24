import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import {
  addLikeToPost,
  savePost,
  showLikeByPost
} from '../controllers/likeController.js'

const likeRouter = express.Router()

likeRouter.post('/like/like-post', authenticate, addLikeToPost)
likeRouter.get('/like/get-likes/:id', showLikeByPost)
likeRouter.post('/like/save-post', authenticate, savePost)

export default likeRouter
