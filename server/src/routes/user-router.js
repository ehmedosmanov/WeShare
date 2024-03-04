import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import {
  createUser,
  deleteFromHistory,
  deleteUser,
  followUser,
  getUser,
  getUserById,
  getUserFollowers,
  getUserFollowings,
  getUsers,
  removeFromFollowers,
  saveSearchHistory,
  searchHistory,
  unFollowUser,
  updateUser
} from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/user/me', authenticate, getUser)
userRouter.get('/user/users', authenticate, getUsers)
userRouter.get('/user/get-history', authenticate, searchHistory)
userRouter.post('/user/save-history/:id', authenticate, saveSearchHistory)
userRouter.delete('/user/delete-history/:id', authenticate, deleteFromHistory)
userRouter.post('/user/follow-user', authenticate, followUser)
userRouter.post('/user/unfollow-user', authenticate, unFollowUser)
userRouter.get('/user/get-followers/:id', authenticate, getUserFollowers)
userRouter.get('/user/get-followings/:id', authenticate, getUserFollowings)
userRouter.delete('/user/deleteUser/:id', authenticate, deleteUser)
userRouter.post('/user/createUser', authenticate, createUser)
userRouter.put('/user/updateUser/:id', authenticate, updateUser)
userRouter.get('/user/getUserById/:id', authenticate, getUserById)
userRouter.delete(
  '/user/remove-follower/:id',
  authenticate,
  removeFromFollowers
)

export default userRouter
