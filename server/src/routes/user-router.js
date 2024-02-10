import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import {
  deleteFromHistory,
  followUser,
  getUser,
  getUserProfile,
  getUsers,
  saveSearchHistory,
  searchHistory
} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/user/me', authenticate, getUser)
userRouter.get('/user/users', authenticate, getUsers)
userRouter.get('/user/get-profile/:id', authenticate, getUserProfile)
userRouter.get('/user/get-history', authenticate, searchHistory)
userRouter.post('/user/save-history', authenticate, saveSearchHistory)
userRouter.delete('/user/delete-history', authenticate, deleteFromHistory)
userRouter.post('/user/follow-user', authenticate, followUser)
export default userRouter
