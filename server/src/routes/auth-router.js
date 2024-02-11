import express from 'express'
import {
  authStatus,
  authWithGoogle,
  getOauth,
  login,
  logout,
  refreshAccessToken,
  register,
  verifyEmail
} from '../controllers/authController.js'
import { authenticate } from '../middleware/authenticate.js'
const authRouter = express.Router()

authRouter.post('/auth/register', register)
authRouter.post('/auth/login', login)
authRouter.post('/auth/logout', logout)
// authRouter.get('/auth/google', getOauth)
// authRouter.get('/auth/google/callback', authWithGoogle)
authRouter.post('/auth/verify-email', verifyEmail)
// authRouter.get('/auth/getGoogleAuthUrl', getOauth)
authRouter.get('/auth/google', getOauth)
authRouter.get('/auth/status', authenticate, authStatus)
authRouter.get('/auth/refresh', refreshAccessToken)

// Маршрут для обработки успешной аутентификации через Google
authRouter.get('/auth/google/callback', authWithGoogle)

export default authRouter
