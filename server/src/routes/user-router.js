import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import {
  deleteFromHistory,
  followUser,
  getUser,
  getUserFollowers,
  getUserFollowings,
  getUsers,
  removeFromFollowers,
  saveSearchHistory,
  searchHistory,
  unFollowUser
} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/user/me', authenticate, getUser)
userRouter.get('/user/users', authenticate, getUsers)
userRouter.get('/user/get-history', authenticate, searchHistory)
userRouter.post('/user/save-history', authenticate, saveSearchHistory)
userRouter.delete('/user/delete-history', authenticate, deleteFromHistory)
userRouter.post('/user/follow-user', authenticate, followUser)
userRouter.post('/user/unfollow-user', authenticate, unFollowUser)
userRouter.get('/user/get-followers/:id', authenticate, getUserFollowers)
userRouter.get('/user/get-followings/:id', authenticate, getUserFollowings)
userRouter.delete(
  '/user/remove-follower/:id',
  authenticate,
  removeFromFollowers
)

export default userRouter
