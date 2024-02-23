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

  io.emit('getOnlineUsers', Object.keys(userSocketMap))

  socket.on('markMessagesAsSeen', async ({ conversationId, userId }) => {
    try {
      await Message.updateMany(
        { conversationId: conversationId, seen: false },
        { $set: { seen: true } }
      )
      await Conversation.updateOne(
        { _id: conversationId },
        { $set: { 'lastMessage.seen': true } }
      )
      io.to(userSocketMap[userId]).emit('messagesSeen', { conversationId })
    } catch (error) {
      console.log(error)
    }
  })

  socket.on('newMessage', newMessage => {
    io.emit('newMessage', newMessage)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id)
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, io, server }
