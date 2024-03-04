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
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        default: []
      }
    ],
    isGroup: {
      type: Boolean,
      default: false
    },
    groupName: {
      type: String,
      default: ''
    },
    groupAvatar: {
      type: String,
      default: '',
      trim: true,
      default: 'default-avatar-profile-icon-social-600nw-1677509740.webp'
    },
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
