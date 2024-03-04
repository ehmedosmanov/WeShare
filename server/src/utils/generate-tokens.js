import jwt from 'jsonwebtoken'

export const generateAccessToken = user => {
  const userData = user.toJSON()
  return jwt.sign(
    {
      userId: user._id
      // ...userData
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '1h' }
  )
}

export const generateRefreshToken = user => {
  const userData = user.toJSON()
  return jwt.sign({ userId: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: '30d'
  })
}

// export const generateResetToken = user => {
//   return jwt.sign({ userId: user._id }, process.env.RESET_TOKEN_SECRET, {
//     expiresIn: '1h'
//   })
// }
