import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import {
  changePassword,
  getUserPosts,
  getUserProfile,
  updateProfile
} from '../controllers/profileController.js'

const profileRouter = express.Router()

profileRouter.get('/user/get-profile/:id', authenticate, getUserProfile)
profileRouter.get('/user/user-posts/:id', authenticate, getUserPosts)
profileRouter.put('/user/update-profile', authenticate, updateProfile)
profileRouter.put('/user/change-password', authenticate, changePassword)

export default profileRouter
