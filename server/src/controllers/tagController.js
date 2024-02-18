import User from '../models/user.model.js'
import Post from '../models/post.model.js'

export const addTag = async (req, res) => {
  try {
    const { userId, postId } = req.body
    const user = await User.findById(userId).populate('tagged')
    if (!user) return res.status(404).json({ message: 'User not found' })

    const post = await Post.findById(postId).populate('tags')
    if (!post) return res.status(404).json({ message: 'Post not found' })
    const userAlreadyTagged = post.tags.some(
      tag => tag._id.toString() === userId
    )

    if (userAlreadyTagged)
      return res
        .status(400)
        .json({ message: 'User is already tagged in this post' })
    post.tags.push(userId)
    await post.save()
    user.tagged.push(postId)
    await user.save()

    res.status(200).json({ message: 'User tagged successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
