import mongoose from 'mongoose'

const { Schema, model } = mongoose

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
  },
  { timestamps: true }
)

const Comment = model('Comment', commentSchema)

export default Comment
