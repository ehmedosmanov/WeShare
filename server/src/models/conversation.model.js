import mongoose from 'mongoose'

const { Schema } = mongoose

const conversationSchema = new Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
      }
    ],
    lastMessage: {
      text: String,
      sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      seen: {
        type: Boolean,
        default: false
      }
    }
  },
  { timestamps: true }
)

const Conversation = mongoose.model('Conversation', conversationSchema)

export default Conversation
