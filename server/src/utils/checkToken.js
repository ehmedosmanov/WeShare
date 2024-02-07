import jwt from 'jsonwebtoken'

const checkToken = async accessToken => {
  try {
    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    return true
  } catch (error) {
    return false
  }
}

export default checkToken
