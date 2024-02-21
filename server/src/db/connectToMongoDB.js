import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGODB_URL = process.env.MONGODB_URL.replace(
  '<password>',
  process.env.PASSWORD
)

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL)
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log('Error connecting to MongoDB', error.message)
  }
}

export default connectToMongoDB
