import mongoose from 'mongoose'

const { Schema, model } = mongoose

const postSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    shares: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    tags: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    media: [
      {
        type: {
          type: String,
          enum: ['Video', 'Image', 'Reel']
        },
        url: { type: String },
        duration: {
          type: Number,
          required: function () {
            return this.type === 'Reel'
          }
        }
      }
    ],
    allowComment: { type: Boolean, default: true }
  },
  { timestamps: true }
)

const Post = model('Post', postSchema)

export default Post
