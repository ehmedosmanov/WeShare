import mongoose from 'mongoose'

const { Schema, model } = mongoose

const postSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['Video', 'Photo', 'Text', 'document'],
      required: true,
      default: 'Text'
    },
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    visibility: {
      type: String,
      enum: ['All Members', 'My Followers', 'Only Me'],
      default: 'All Members'
    },
    content: { type: String, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    tags: [{ type: String }],
    media: [{ type: String }],
    hashtags: [{ type: String }],
    isEdited: { type: Boolean, default: false },
    allowComment: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const Post = model('Post', postSchema)

export default Post
