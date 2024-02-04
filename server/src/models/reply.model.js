import mongoose from 'mongoose'

const { Schema, model } = mongoose

const replySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    comment: { type: Schema.Types.ObjectId, ref: 'Comment' },
    content: { type: String }
  },
  { timestamps: true }
)

const Reply = model('Reply', replySchema)

export default Reply
