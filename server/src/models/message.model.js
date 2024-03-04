import mongoose from 'mongoose'

const { Schema, model } = mongoose

const messageSchema = new Schema(
  {
    conversationId: {
      type: Schema.Types.ObjectId,
      ref: 'Conversation'
    },
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User' },
    receiversByGroup: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messageType: { type: String, enum: ['text', 'voice'], required: true },
    message: { type: String },
    voiceMessage: { type: String },
    img: {
      type: String,
      default: ''
    },
    seen: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const Message = model('Message', messageSchema)
