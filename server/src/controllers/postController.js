import Post from '../models/post.model.js'
import generateFileName from '../utils/generate-filename.js'
import {
  deleteFile,
  getObjectSignedUrl,
  getVideoDurationFromS3,
  uploadFile
} from '../helpers/s3.js'
import sharp from 'sharp'
import { fileTypeFromBuffer } from 'file-type'
import User from '../models/user.model.js'

//TODO: GET TAGGED POST
//TODO: EDIT POST

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().populate('user')

    for (let post of allPosts) {
      for (let mediaItem of post.media) {
        mediaItem.url = await getObjectSignedUrl(mediaItem.url)
      }
    }

    res.status(200).json(allPosts)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getFollowingPosts = async (req, res) => {
  try {
    const currentUserId = req.user.userId
    const limit = 3
    const page = req.query.page ? parseInt(req.query.page) : 1
    const skip = (page - 1) * limit

    const findUser = await User.findById(currentUserId).populate('following')
    if (!findUser) return res.status(404).json({ message: 'User not found' })

    const followingsUser = findUser.following

    const followingsUserPosts = await Post.find({
      user: { $in: followingsUser }
    })
      .populate('comments')
      .populate('user likes shares tags')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
    // undefined console.log(followingsUserPosts.media)

    await Promise.all(
      followingsUserPosts.map(async post => {
        await Promise.all(
          post.media.map(async mediaItem => {
            mediaItem.url = await getObjectSignedUrl(mediaItem.url)
          })
        )
      })
    )

    res.status(200).json({ posts: followingsUserPosts, nextPage: page + 1 })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const getByIdPost = async (req, res) => {
  try {
    const { id } = req.params
    const findPost = await Post.findById(id)
      .populate('user')
      .populate({
        path: 'comments',
        populate: [
          { path: 'user' },
          { path: 'post' },
          { path: 'parentComments' },
          { path: 'replies' }
        ]
      })

    for (let mediaItem of findPost.media) {
      mediaItem.url = await getObjectSignedUrl(mediaItem.url)
    }
    if (!findPost) return res.status(404).json({ message: 'No post found' })
    res.status(200).json(findPost)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createPost = async (req, res) => {
  try {
    const { content, userIds } = req.body
    const createrUserId = req.user.userId
    const allFiles = Object.values(req.files)

    if (allFiles.length === 0)
      return res.status(404).json({ message: 'Files not found' })

    const findCreaterUser = await User.findById(createrUserId).populate('posts')
    if (!findCreaterUser)
      return res.status(404).json({ message: 'No user found' })

    let mediaArray = []
    let videoFileCount = 0
    let usersForTag = []
    if (userIds) {
      usersForTag = await User.find({ _id: { $in: userIds } })
      if (!usersForTag.length)
        return res.status(404).json({ message: 'Users not found' })
    }

    for (let file of allFiles) {
      const postName = generateFileName()
      const type = await fileTypeFromBuffer(file.buffer)
      let mediaType
      let fileBuffer

      if (type.mime.startsWith('image')) {
        mediaType = 'Image'
        fileBuffer = await sharp(file.buffer)
          .resize({ height: 1920, width: 1080, fit: 'contain' })
          .toBuffer()
      } else if (type.mime.startsWith('video')) {
        videoFileCount++
        fileBuffer = file.buffer
        // await processVideoFile(postName, postName, 'processed_' + postName)
        await uploadFile(fileBuffer, postName, file.mimetype)

        const duration = await getVideoDurationFromS3(postName)
        const durationMilliseconds = Math.floor(duration) * 1000
        console.log(durationMilliseconds)

        if (
          (videoFileCount === 1 &&
            allFiles.length === 1 &&
            durationMilliseconds > 180000) ||
          (allFiles.length > 1 && durationMilliseconds > 60000)
        ) {
          return res.status(400).json({
            message:
              'If any videos are longer than one minute, you can only post one video at a time.'
          })
        }
        if (durationMilliseconds <= 60000) {
          mediaType = 'Reel'
        } else {
          mediaType = 'Video'
        }
        mediaType = 'Video'
      } else {
        return res.status(400).json({ message: 'Unsupported file type.' })
      }

      await uploadFile(fileBuffer, postName, file.mimetype)

      mediaArray.push({
        type: mediaType,
        duration: mediaType === 'Reel' ? durationMilliseconds : undefined,
        url: postName
      })
    }

    const post = new Post({
      ...req.body,
      content: content,
      user: findCreaterUser._id,
      tags: usersForTag,
      media: mediaArray
    })

    await post.save()

    findCreaterUser.posts.push(post)
    await findCreaterUser.save()

    for (let user of post.tags) {
      user.tagged.push(post)
      await user.save()
    }

    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params
    const findPost = await Post.findById(id)

    if (!findPost) return res.status(404).json({ message: 'No post found' })
    await Promise.all(
      findPost.media.map(async mediaUrl => {
        await deleteFile(mediaUrl.url)
      })
    )
    await Post.findByIdAndDelete(id)
    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// export const getCommentsForPost = async (req, res) => {
//   try {
//     const postId = req.params.postId
//     const post = await Post.findById(postId).populate('comments')
//     if (!post) {
//       return res.status(404).json({ message: 'Post not found' })
//     }
//     res.json(post.comments)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }
