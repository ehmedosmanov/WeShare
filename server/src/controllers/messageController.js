import Conversation from '../models/conversation.model.js'
import { Message } from '../models/message.model.js'
import User from '../models/user.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

export const sendMessage = async (req, res) => {
  try {
    console.log(req.params)
    console.log(req.body)
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

    const messages = conversation.messages

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserInbox = async (req, res) => {
  try {
    const userId = req.user.userId

    const conversation = await Conversation.find({
      participants: userId
    }).populate('participants')

    const test = conversation.map(conversation => {
      return conversation.participants
    })
    console.log(test)

    const otherUsers = conversation.map(conversation => {
      return conversation.participants.find(
        participant => participant._id.toString() !== userId.toString()
      )
    })

    res.status(200).json(otherUsers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
