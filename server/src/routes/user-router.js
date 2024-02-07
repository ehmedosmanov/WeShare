import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import { getUser, getUsers } from '../controllers/userController.js'

const userRouter = express.Router()

userRouter.get('/user/me', authenticate, getUser)
userRouter.get('/user/users', authenticate, getUsers)

export default userRouter
