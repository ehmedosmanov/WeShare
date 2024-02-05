import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth-router.js'
import postRouter from './routes/post-router.js'

const app = express()

app.use(
  cors({
    credentials: true
  })
)
app.use(cookieParser())
app.use(express.json())

app.use('/api', authRouter)
app.use('/api', postRouter)

export default app
