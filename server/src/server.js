// import mongoose from 'mongoose'
// import dotenv from 'dotenv'
// import { server } from './socket/socket.js'
// import connectToMongoDB from './db/connectToMongoDB.js'
// import app from './index.js'
// import { createServer } from 'http'
// import { Server } from 'socket.io'

// dotenv.config()

// const PORT = process.env.PORT || 8000
// const MONGODB_URL = process.env.MONGODB_URL.replace(
//   '<password>',
//   process.env.PASSWORD
// )

// mongoose
//   .connect(MONGODB_URL)
//   .then(() => {
//     console.log('Connected to MongoDB')
//   })
//   .catch(error => {
//     console.error('Error connecting to MongoDB:', error.message)
//   })

// const httpServer = createServer(app)

// const io = new Server(httpServer)

// export const getRecieverSocketId = recieverId => {
//   return userSocketMap[recieverId]
// }

// const userSocketMap = {}

// io.on('connection', socket => {
//   console.log('sa user', socket.id)

//   const userId = socket.handshake.query.userId
//   if (userId != undefined) userSocketMap[userId] = socket.id

//   io.emit('getOnlineUser', Object.keys(userSocketMap))

//   socket.on('disconnect', () => {
//     console.log('user disconnected', socket.id)
//     delete userSocketMap[socket.id]
//     io.emit('getOnlineUsers', Object.keys(userSocketMap))
//   })
// })

// server.listen(PORT, () => {
//   connectToMongoDB()
//   console.log(`Server is running on port ${PORT}`)
// })

// // export { io, httpServer }
