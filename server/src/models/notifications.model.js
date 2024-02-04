import mongoose from 'mongoose'

const { Schema, model } = mongoose

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  type: String,
  content: { type: Schema.Types.ObjectId, refPath: 'onModel' },
  onModel: {
    type: String,
    enum: ['Post', 'Comment', 'User', 'Message']
  },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})
