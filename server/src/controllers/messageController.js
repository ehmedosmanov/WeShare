import { getObjectSignedUrl, uploadFile } from '../helpers/s3.js'
import Conversation from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'
import User from '../models/user.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js'
import generateFileName from '../utils/generate-filename.js'

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id } = req.params //reciver
    const senderId = req.user.userId

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, id] } //sender user and reciever user
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, id]
      })
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: id,
      messageType: 'text',
      message
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    const sender = await User.findById(senderId)
    const receiver = await User.findById(id)

    sender.conversations.push(conversation._id)
    receiver.conversations.push(conversation._id)

    await Promise.all([
      conversation.save(),
      newMessage.save(),
      sender.save(),
      receiver.save()
    ])

    //socket id
    const receiverSocketId = getReceiverSocketId(id)

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// export const sendMessage = async (req, res) => {
//   try {
//     const { message } = req.body
//     const { id } = req.params // id беседы
//     const senderId = req.user.userId

//     let conversation = await Conversation.findById(id)

//     if (!conversation) {
//       return res.status(404).json({ message: 'Conversation not found' })
//     }

//     const newMessage = new Message({
//       sender: senderId,
//       receiver: id,
//       messageType: 'text',
//       message
//     })

//     if (newMessage) {
//       conversation.messages.push(newMessage._id)
//     }

//     await Promise.all([conversation.save(), newMessage.save()])

//     const receiverSocketId = getReceiverSocketId(id)

//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit('newMessage', newMessage)
//     }

//     res.status(201).json(newMessage)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params
    const senderId = req.user.userId
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] }
    }).populate('messages')

    if (!conversation) {
      return res.status(200).json([])
    }

    const messages = await Promise.all(
      conversation.messages.map(async message => {
        if (message.messageType === 'voice') {
          message.voiceMessage = await getObjectSignedUrl(message.voiceMessage)
        }
        return message
      })
    )
    console.log(messages)
    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const sendVoiceMessage = async (req, res) => {
  try {
    const { id } = req.params
    const senderId = req.user.userId
    const voiceMessage = req.file

    await uploadFile(
      voiceMessage.buffer,
      voiceMessage.originalname,
      voiceMessage.mimeType
    )
    const voiceMessageUrl = await getObjectSignedUrl(voiceMessage.originalname)

    console.log(voiceMessageUrl)

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, id] }
    })

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, id]
      })
    }

    console.log('url', voiceMessageUrl)

    const voiceMessageId = voiceMessage.originalname

    const newMessage = new Message({
      sender: senderId,
      receiver: id,
      messageType: 'voice',
      voiceMessage: voiceMessageId
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id)
    }

    const sender = await User.findById(senderId)
    const receiver = await User.findById(id)

    sender.conversations.push(conversation._id)
    receiver.conversations.push(conversation._id)

    await Promise.all([
      conversation.save(),
      newMessage.save(),
      sender.save(),
      receiver.save()
    ])

    const receiverSocketId = getReceiverSocketId(id)

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newVoiceMessage', newMessage)
    }

    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserInbox = async (req, res) => {
  try {
    const userId = req.user.userId

    const user = await User.findById(userId).populate('groups')

    const allConversations = await Conversation.find({
      participants: userId
    }).populate('participants')

    const userConversations = allConversations.filter(
      conversation =>
        !user.groups.some(group => group._id.equals(conversation._id))
    )

    const otherUsers = await Promise.all(
      userConversations.map(async conversation => {
        const otherUser = conversation.participants.find(
          participant => participant._id.toString() !== userId.toString()
        )
        if (otherUser && otherUser.avatar) {
          otherUser.avatar = await getObjectSignedUrl(otherUser.avatar)
        }
        return otherUser
      })
    )

    console.log(`Conversation`, otherUsers)

    res.status(200).json(otherUsers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
