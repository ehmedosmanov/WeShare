import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import router from './routes/auth-router.js'

const app = express()

app.use(
  cors({
    credentials: true
  })
)
app.use(cookieParser())
app.use(express.json())

app.use('/api', router)

export default app
