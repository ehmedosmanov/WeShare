import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import {
  changeAvatar,
  changePassword,
  getUserPosts,
  getUserProfile,
  updateProfile
} from '../controllers/profileController.js'
import upload from '../helpers/multer-upload.js'

const profileRouter = express.Router()

profileRouter.get('/user/get-profile/:id', authenticate, getUserProfile)
profileRouter.get('/user/user-posts/:id', authenticate, getUserPosts)
profileRouter.put('/user/update-profile', authenticate, updateProfile)
profileRouter.put('/user/change-password', authenticate, changePassword)
profileRouter.put(
  '/user/change-avatar',
  upload.single('avatar'),
  authenticate,
  changeAvatar
)

export default profileRouter
