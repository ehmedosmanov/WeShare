import User from '../models/user.model.js'
import sendMail from '../services/send-email.js'
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/generate-tokens.js'
import userValidationSchema from '../validators/user-validation.js'

export const login = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const register = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }
    const { firstName, lastName, username, password, email } = req.body
    const userExist = await User.findOne({ email: email })
    if (userExist)
      return res.status(409).json({ message: 'User Already Exist' })

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password
    })
    newUser.emailVerification()

    await newUser.save()

    const accessToken = generateAccessToken(newUser)
    const refreshToken = generateRefreshToken(newUser)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })

    const emailText = `Please click the following link to verify your email: 
    ${process.env.CLIENT_URL}/verify-email?token=${newUser.emailVerificationToken}`
    await sendMail(newUser.email, 'Please verify your email', emailText)

    res.status(201).json({ token: accessToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ emailVerificationToken: req.query.token })
    if (!user) {
      return res.status(400).json({ message: 'Invalid token.' })
    }
    user.verified = true
    user.emailVerificationToken = undefined
    await user.save()
    res.redirect(process.env.CLIENT_URL + '/')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
