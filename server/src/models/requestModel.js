import mongoose from 'mongoose'

const { Schema, model } = mongoose

const requestSchema = new Schema(
  {
    fromUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    toUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

const Comment = model('Request', requestSchema)

export default Comment
