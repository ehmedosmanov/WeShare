import express from 'express'
import {
  getMessages,
  getUserInbox,
  sendMessage,
  sendVoiceMessage
} from '../controllers/messageController.js'
import { authenticate } from '../middleware/authenticate.js'
import upload from '../helpers/multer-upload.js'

const messageRouter = express.Router()

messageRouter.post('/message/send/:id', authenticate, sendMessage)
messageRouter.get('/message/:id', authenticate, getMessages)
messageRouter.get('/message', authenticate, getUserInbox)
messageRouter.post(
  '/message/sendVoice/:id',
  authenticate,
  upload.single('voiceMessage'),
  sendVoiceMessage
)

export default messageRouter
