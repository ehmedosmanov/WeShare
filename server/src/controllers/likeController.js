import User from '../models/user.model.js'
import Post from '../models/post.model.js'

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

    // await user.save()
    // await post.save()
    await Promise.all([user.save(), post.save()])
    res.status(200).json({ message: 'Successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const showLikeByPost = async (req, res) => {
  try {
    const { id } = req.params

    console.log(req.params)

    const post = await Post.findById(id).populate('likes')

    if (!post) return res.status(404).json({ message: 'Post not found' })

    const likes = post.likes

    res.status(200).json(likes)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
