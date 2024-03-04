import express from 'express'
import { authenticate } from '../middleware/authenticate.js'
import upload from '../helpers/multer-upload.js'
import {
  createGroup,
  deleteGroup,
  getGroupMessages,
  getUserGroups,
  sendGroupMessage
} from '../controllers/groupController.js'

const groupRouter = express.Router()

groupRouter.post(
  '/group/createGroup',
  upload.single('groupAvatar'),
  authenticate,
  createGroup
)
groupRouter.get('/group/getGroup', authenticate, getUserGroups)
groupRouter.delete('/group/deleteGroup/:id', authenticate, deleteGroup)
groupRouter.post('/group/send/:id', authenticate, sendGroupMessage)
groupRouter.get('/group/:id', authenticate, getGroupMessages)
// messageRouter.post(
//   '/message/sendVoice/:id',
//   authenticate,
//   upload.single('voiceMessage'),
//   sendVoiceMessage
// )

export default groupRouter
