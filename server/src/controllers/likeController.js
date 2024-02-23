import User from '../models/user.model.js'
import Post from '../models/post.model.js'
import { getObjectSignedUrl } from '../helpers/s3.js'

export const addLikeToPost = async (req, res) => {
  try {
    const currentUserId = req.user.userId
    const { id } = req.body

    console.log(req.body)

    const user = await User.findById(currentUserId)
    const post = await Post.findById(id)

    if (!user || !post) {
      return res.status(404).json({ message: 'User or post not found' })
    }

    const hasLiked = user.likes.includes(id)

    if (hasLiked) {
      user.likes.pull(id)
      post.likes.pull(currentUserId)
    } else {
      user.likes.addToSet(id)
      post.likes.addToSet(currentUserId)
    }

    await user.save()
    const postId = await post.save()
    res.status(200).json(postId._id)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const showLikeByPost = async (req, res) => {
  try {
    const { id } = req.params

    const post = await Post.findById(id).populate('likes')

    if (!post) return res.status(404).json({ message: 'Post not found' })

    let likes = post.likes

    const promiseLike = likes.map(async like => {
      like.avatar = await getObjectSignedUrl(like.avatar)
      return like
    })
    likes = await Promise.all(promiseLike)

    res.status(200).json(likes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
