import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies

  if (!accessToken) {
    req.user = null
    return next()
    // return res.send({ isAuthenticated: false })
  }
  try {
    const { userId } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    if (!userId) {
      return res.status(401).json({ message: 'jwt expired' })
    }
    const user = await User.findById(userId)

    if (!user.verified) {
      return res.status(403).json({ message: 'User is not verified' })
    }

    user.userId = user._id
    delete user._id

    req.user = user
    next()
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ message: 'jwt expired' })
    }
    return res.status(500).json({ message: error.message })
  }
}

export const checkRole = (req, res, userRole) => {
  const { role } = req.user

  if (role !== 'superAdmin' && userRole === 'superAdmin') {
    return res
      .status(403)
      .json({ message: 'Only superAdmin can create or update a superAdmin' })
  }
  if (role === 'User') {
    return res
      .status(403)
      .json({ message: 'Users cannot create or update other users' })
  }

  if (role === 'Admin' && (userRole === 'Admin' || userRole === 'superAdmin')) {
    return res
      .status(403)
      .json({ message: 'Admin can only create or update User' })
  }
}
