import Comment from '../models/coment.model.js'
import Post from '../models/post.model.js'
import User from '../models/user.model.js'

const findAndPushAndSave = async (id, model, comment) => {
  const find = await model.findById(id)
  if (!find) return res.status(404).json({ message: `No ${model} foind` })
  find.comments.push(comment)
  await find.save()
  return find
}

export const addCommentToPost = async (req, res) => {
  try {
    const currentUserId = req.user.userId
    const { postId, content, parentId } = req.body

    const newComment = new Comment({
      user: currentUserId,
      content: content,
      post: postId
    })

    await newComment.save()

    if (parentId) {
      const findParentComment = await Comment.findById(parentId)
      if (!findParentComment)
        return res.status(404).json({ message: 'No parent comment found' })
      findParentComment.replies.push(newComment)
      newComment.parentComments.push(findParentComment)
      await findParentComment.save()
    }

    await findAndPushAndSave(currentUserId, User, newComment)
    await findAndPushAndSave(postId, Post, newComment)

    res.status(200).json(newComment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
