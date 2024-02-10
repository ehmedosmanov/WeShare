import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth-router.js'
import postRouter from './routes/post-router.js'
import bodyParser from 'body-parser'
import userRouter from './routes/user-router.js'

const app = express()

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

export default app
