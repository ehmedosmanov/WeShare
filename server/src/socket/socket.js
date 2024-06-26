import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
import { Message } from '../models/message.model.js'
import Conversation from '../models/conversation.model.js'

const app = express()

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173'],
    credentials: true
  }
})

export const getReceiverSocketId = receiverId => {
  return userSocketMap[receiverId]
}

const userSocketMap = {}

io.on('connection', socket => {
  console.log('a user connected', socket.id)

  const userId = socket.handshake.query.userId
  if (userId != 'undefined') userSocketMap[userId] = socket.id


  console.log('a socket connected help me', socket.id)

  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('markMessagesAsSeen', async ({ conversationId, userId }) => {
    try {
      console.log('seen message sa', conversationId, userId)
      const res = await Message.updateMany(
        { conversationId: conversationId, receiver: userId },
        { $set: { seen: true } },
        { new: true }
      )
      console.log('undefined olan', res)
      await Conversation.updateOne(
        { _id: conversationId },
        { $set: { 'lastMessage.seen': true } }
      )
      io.to(userSocketMap[userId]).emit('messagesSeen', {
        conversationId
      })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('newMessage', newMessage => {
    console.log('ISLEYIR BUUUUUUUUUUUUUUUUU', newMessage)
    io.emit('newMessage', newMessage)
  })

  socket.on('newVoiceMessage', newVoiceMessage => {
    io.emit('newVoiceMessage', newVoiceMessage)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, io, server }
