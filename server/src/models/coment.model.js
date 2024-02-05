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

const commentSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
    replies: [replySchema]
  },
  { timestamps: true }
)

const Comment = model('Comment', commentSchema)

export default Comment
