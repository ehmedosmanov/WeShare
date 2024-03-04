import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth-router.js'
import postRouter from './routes/post-router.js'
import userRouter from './routes/user-router.js'
import profileRouter from './routes/profile-router.js'
import commentRouter from './routes/comment-router.js'
import likeRouter from './routes/like-router.js'
import messageRouter from './routes/message-router.js'
import groupRouter from './routes/group-router.js'
import connectToMongoDB from './db/connectToMongoDB.js'
import { app, server } from './socket/socket.js'

dotenv.config()

const PORT = process.env.PORT || 8000

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true
  })
)
app.use(cookieParser())
app.use(express.json())
app.use('/api', authRouter)
app.use('/api', postRouter)
app.use('/api', userRouter)
app.use('/api', profileRouter)
app.use('/api', commentRouter)
app.use('/api', likeRouter)
app.use('/api', messageRouter)
app.use('/api', groupRouter)

server.listen(PORT, () => {
  connectToMongoDB()
  console.log(`Server is running on port ${PORT}`)
})
