import mongoose from 'mongoose'
import dotenv from 'dotenv'
import app from './index.js'

dotenv.config()

const PORT = process.env.PORT || 8000
const MONGODB_URL = process.env.MONGODB_URL.replace(
  '<password>',
  process.env.PASSWORD
)

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message)
  })

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
