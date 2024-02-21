import mongoose from 'mongoose'

const { Schema, model } = mongoose

const messageSchema = new Schema(
  {
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    seen: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const Message = model('Message', messageSchema)
