import jwt from 'jsonwebtoken'

export const authenticate = async (req, res, next) => {
  const { accessToken } = req.cookies

  if (!accessToken) {
    req.user = null
    return next()
    // return res.send({ isAuthenticated: false })
  }
  try {
    const user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    if (!user) {
      return res.status(401).json({ message: 'jwt expired' })
    }

    if (!user.verified) {
      return res.status(403).json({ message: 'User is not verified' })
    }

    req.user = user
    next()
  } catch (error) {
    if (error.message === 'jwt expired') {
      return res.status(401).json({ message: 'jwt expired' })
    }
    return res.status(500).json({ message: error.message })
  }
}
