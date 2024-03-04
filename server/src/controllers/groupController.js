import sharp from 'sharp'
import { getObjectSignedUrl, uploadFile } from '../helpers/s3.js'
import Conversation from '../models/conversation.model.js'
import User from '../models/user.model.js'
import generateFileName from '../utils/generate-filename.js'
import { Message } from '../models/message.model.js'
import { getReceiverSocketId, io } from '../socket/socket.js'

export const createGroup = async (req, res) => {
  try {
    const { groupName } = req.body
    let { participants } = req.body
    const { userId } = req.user
    const groupAvatar = req.file
    const avatarName = generateFileName()

    console.log('participants ids', participants)

    const fileBuffer = await sharp(groupAvatar.buffer)
      .resize({
        width: 140,
        height: 140,
        fit: 'contain'
      })
      .toBuffer()

    const uniqueParticipants = participants.includes(userId)
      ? participants
      : [...participants, userId]

    await uploadFile(fileBuffer, avatarName, groupAvatar.mimetype)

    const newGroup = new Conversation({
      participants: uniqueParticipants,
      admin: userId,
      isGroup: true,
      groupAvatar: avatarName,
      groupName
    })

    const saveGroup = await newGroup.save()

    await User.updateMany(
      { _id: { $in: [...participants, userId] } },
      {
        $push: {
          conversations: saveGroup._id,
          groups: saveGroup._id
        }
      }
    )
    res.status(200).json(saveGroup)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.user

    console.log(req.params)

    const group = await Conversation.findById(id)

    console.log('admin', group.admin.toString())
    console.log('current', userId)

    if (group.admin.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: 'User is not the admin of the group' })
    }

    await Conversation.findByIdAndDelete(id)

    await User.updateMany(
      { _id: { $in: group.participants } },
      {
        $pull: {
          conversations: id,
          groups: id
        }
      }
    )

    res.status(200).json({ message: 'Group deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.user

    const user = await User.findById(userId).populate({
      path: 'groups',
      populate: [
        { path: 'participants', model: 'User' },
        { path: 'messages', model: 'Message' }
      ]
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    // const groups = user.groups
    // console.log(groups)

    const groups = await Promise.all(
      user.groups.map(async group => {
        if (group.groupAvatar) {
          group.groupAvatar = await getObjectSignedUrl(group.groupAvatar)
        }
        return group
      })
    )

    res.status(200).json(groups)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const removeMember = async (req, res) => {
  try {
    const { groupId, memberId } = req.params
    const { userId } = req.user

    const group = await Conversation.findById(groupId)

    if (group.admin.toString() !== userId) {
      return res
        .status(403)
        .json({ message: 'User is not the admin of the group' })
    }

    group.participants = group.participants.filter(
      participant => participant.toString() !== memberId
    )
    await group.save()

    await User.updateOne(
      { _id: memberId },
      {
        $pull: {
          conversations: groupId,
          groups: groupId
        }
      }
    )

    res.status(200).json({ message: 'Member removed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const sendGroupMessage = async (req, res) => {
  try {
    const { message } = req.body
    const { id } = req.params
    const senderId = req.user.userId

    let group = await Conversation.findById(id)

    console.log(group)

    if (!group) {
      return res.status(404).json({ message: 'Group not found' })
    }

    const newMessage = new Message({
      sender: senderId,
      messageType: 'text',
      receiversByGroup: group.participants,
      message
    })

    if (newMessage) {
      group.messages.push(newMessage._id)
    }

    await Promise.all([group.save(), newMessage.save()])

    group.participants.forEach(participant => {
      const participantSocketId = getReceiverSocketId(participant)
      if (participantSocketId) {
        io.to(participantSocketId).emit('newMessage', newMessage)
      }
    })

    res.status(201).json(newMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getGroupMessages = async (req, res) => {
  try {
    const { id: conversationId } = req.params

    let conversation = await Conversation.findById(conversationId).populate({
      path: 'messages',
      populate: { path: 'receiversByGroup' }
    })

    if (!conversation) {
      return res.status(404).json({ message: 'Conversation not found' })
    }

    const messages = await Promise.all(
      conversation.messages.map(async message => {
        if (message.messageType === 'voice') {
          message.voiceMessage = await getObjectSignedUrl(message.voiceMessage)
        }
        message.receiversByGroup = await Promise.all(
          message.receiversByGroup.map(async receiver => {
            if (receiver.avatar) {
              receiver.avatar = await getObjectSignedUrl(receiver.avatar)
            }
            return receiver
          })
        )
        return message
      })
    )

    console.log(messages)

    res.status(200).json(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
