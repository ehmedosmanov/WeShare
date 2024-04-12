import { fileTypeFromBuffer } from 'file-type'
import { getObjectSignedUrl, uploadFile } from '../helpers/s3.js'
import Post from '../models/post.model.js'
import User from '../models/user.model.js'
import generateFileName from '../utils/generate-filename.js'
import { profileSchema } from '../validators/profile-validations.js'
import bcrypt from 'bcrypt'
import sharp from 'sharp'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params

    const findUser = await User.findById(id).populate(
      'followers following posts'
    )

    if (!findUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    findUser.avatar = await getObjectSignedUrl(findUser.avatar)

    await Promise.all(
      findUser.posts.map(async post => {
        await Promise.all(
          post.media.map(async mediaItem => {
            mediaItem.url = await getObjectSignedUrl(mediaItem.url)
          })
        )
      })
    )

    res.status(200).json(findUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserPosts = async (req, res) => {
  try {
    const { id } = req.params
    const limit = 6
    const page = req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * limit
    const findUser = await User.findById(id).populate('posts')

    if (!findUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const posts = await Post.find({
      user: { $in: findUser }
    })
      .populate('comments')
      .populate('user likes')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)

    await Promise.all(
      posts.map(async post => {
        await Promise.all(
          post.media.map(async mediaItem => {
            mediaItem.url = await getObjectSignedUrl(mediaItem.url)
          })
        )
      })
    )
    res.status(200).json({ posts: posts, nextPage: page + 1 })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserSavedPosts = async (req, res) => {
  try {
    const currentUser = req.user
    const limit = 6
    const page = req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * limit
    const userWithSavedPosts = await User.findById(
      currentUser?.userId
    ).populate({
      path: 'savedPosts',
      model: 'Post',
      options: {
        skip: skip,
        limit: limit,
        sort: { createdAt: -1 }
      },
      populate: {
        path: 'user likes comments',
        model: 'User'
      }
    })

    if (!userWithSavedPosts) {
      return res.status(404).json({ message: 'User not found' })
    }

    await Promise.all(
      userWithSavedPosts.savedPosts.map(async post => {
        await Promise.all(
          post.media.map(async mediaItem => {
            mediaItem.url = await getObjectSignedUrl(mediaItem.url)
          })
        )
      })
    )

    res
      .status(200)
      .json({ posts: userWithSavedPosts.savedPosts, nextPage: page + 1 })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { id, data } = req.body
    const { error } = profileSchema.validate(data)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true })

    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User successfully updated' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const { _id } = req.user

    const findCurrentUser = await User.findById(_id)

    const isValidPassword = await findCurrentUser.checkPassword(oldPassword)

    if (!isValidPassword)
      return res.status(400).json({ message: 'Password is not valid' })

    const hashPassword = await bcrypt.hash(newPassword, 10)
    const findUser = await User.findByIdAndUpdate(
      findCurrentUser._id,
      {
        password: hashPassword
      },
      { new: true }
    )
    if (!findUser) return res.status(404).json({ message: 'User not found' })

    await findUser.save()
    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const changeAvatar = async (req, res) => {
  try {
    const { userId } = req.user
    const avatar = req.file
    const avatarName = generateFileName()

    console.log(avatar)

    const fileBuffer = await sharp(avatar.buffer)
      .resize({
        width: 140,
        height: 140,
        fit: 'contain'
      })
      .toBuffer()

    await uploadFile(fileBuffer, avatarName, avatar.mimetype)

    const findUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: { avatar: avatarName }
      },
      { new: true }
    )

    res.status(200).json(findUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const enableUserPrivacy = async (req, res) => {
  try {
    const { userId } = req.user

    const findUser = await User.findById(userId)

    if (!findUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    findUser.privateProfile = !findUser.privateProfile
    await findUser.save()

    return res.status(200).json({ message: 'User privacy has been updated' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
