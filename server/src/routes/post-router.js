import express from 'express'
import upload from '../helpers/multer-upload.js'
import { createPost } from '../controllers/postController.js'

const postRouter = express.Router()

postRouter.post('/add-post', upload.single('content'), createPost)

export default postRouter
