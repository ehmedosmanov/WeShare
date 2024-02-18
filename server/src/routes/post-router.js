import express from 'express'
import upload from '../helpers/multer-upload.js'
import { authenticate } from '../middleware/authenticate.js'
import {
  createPost,
  deletePost,
  getAllPosts,
  getByIdPost,
  getFollowingPosts
} from '../controllers/postController.js'

const postRouter = express.Router()

postRouter.post(
  '/post/add-post',
  upload.array('media', 10),
  authenticate,
  createPost
)
postRouter.get('/post/get-posts', authenticate, getAllPosts)
postRouter.get('/post/get-followings-posts', authenticate, getFollowingPosts)
postRouter.delete('/post/delete-post/:id', deletePost)
postRouter.get('/post/get-post/:id', authenticate, getByIdPost)

export default postRouter
