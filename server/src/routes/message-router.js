import express from 'express'
import {
  getMessages,
  getUserInbox,
  sendMessage
} from '../controllers/messageController.js'
import { authenticate } from '../middleware/authenticate.js'

const messageRouter = express.Router()

messageRouter.post('/message/send/:id', authenticate, sendMessage)
messageRouter.get('/message/:id', authenticate, getMessages)
messageRouter.get('/message', authenticate, getUserInbox)

export default messageRouter
