import express from 'express'
import { login, register, verifyEmail } from '../controllers/authController.js'

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/verify-email', verifyEmail)

export default authRouter
