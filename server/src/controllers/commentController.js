import { getObjectSignedUrl } from '../helpers/s3.js'
import Comment from '../models/coment.model.js'
import Post from '../models/post.model.js'
import User from '../models/user.model.js'

const findAndPushAndSave = async (id, model, comment) => {
  const find = await model.findById(id)
  if (!find) return res.status(404).json({ message: `No ${model} found` })
  find.comments.push(comment)
  await find.save()
  return find
}

// const findAndPullAndSave = async (id, model, comment) => {
//   const find = await model.findById(id)
//   if (!find) return res.status(404).json({ message: `No ${model} found` })
//   find.comments.pull(comment)
//   await find.save()
//   return find
// }

const getAllComments = async postId => {
  try {
    const post = await Post.findById(postId).exec()

    if (!post) {
      return null
    }

    const allComment = []

    const populateReplies = async (commentId, parentComment = null) => {
      const comment = await Comment.findById(commentId)
        .populate('user')
        .populate({
          path: 'replies',
          populate: [{ path: 'user' }]
        })
        .exec()

      if (!comment) {
        return
      }

      if (comment.user && comment.user.avatar) {
        comment.user.avatar = await getObjectSignedUrl(comment.user.avatar)
      }

      if (!parentComment) {
        allComment.push(comment)
      }

      if (parentComment) {
        comment.parentComments.push(parentComment._id)
        await comment.save()
      }

      for (const replyId of comment.replies) {
        await populateReplies(replyId, comment)
      }
    }

    for (const commentId of post.comments) {
      await populateReplies(commentId)
    }
    return allComment
  } catch (error) {
    console.error('Error:', error)
    return null
  }
}

export const addCommentToPost = async (req, res) => {
  try {
    const currentUserId = req.user.userId
    const { postId, content, parentId } = req.body

    let topParentId = parentId

    if (parentId) {
      const parentComment = await Comment.findById(parentId)
      if (!parentComment)
        return res.status(404).json({ message: 'No parent comment found' })
      if (parentComment.parentComments.length > 0) {
        topParentId = parentComment.parentComments[0]
      }
    }

    const newComment = new Comment({
      user: currentUserId,
      content: content,
      post: postId,
      parentComments: topParentId ? [topParentId] : []
    })

    await newComment.save()

    if (topParentId) {
      const topParentComment = await Comment.findById(topParentId)
      topParentComment.replies.push(newComment)
      await topParentComment.save()
    }

    await findAndPushAndSave(currentUserId, User, newComment)
    await findAndPushAndSave(postId, Post, newComment)

    res.status(200).json(newComment)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getPostComments = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'postId is required' })
    }

    const getComments = await getAllComments(id)

    if (!getComments) {
      return res.status(404).json({ message: 'Comments not found' })
    }

    res.status(200).json(getComments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params

    const comment = await Comment.findById(id)

    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    const post = await Post.findById(comment.post)
    post.comments.pull(id)
    await post.save()

    const user = await User.findById(comment.user)
    user.comments.pull(id)
    await user.save()

    if (comment.parentComments.length > 0) {
      const parentComment = await Comment.findById(comment.parentComments[0])
      parentComment.replies.pull(id)
      await parentComment.save()
    }

    await Comment.findByIdAndDelete(id)

    if (!comment) return res.status(404).json({ message: 'Comment not found' })

    res.status(200).json({ message: 'Comment deleted' })
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
