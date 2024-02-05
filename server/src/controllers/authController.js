import User from '../models/user.model.js'
import sendMail from '../services/send-email.js'
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/generate-tokens.js'
import userValidationSchema from '../validators/user-validation.js'

// TODO: ADD OAUTH GOOGLE
export const login = async (req, res) => {
  try {
    const { error } = userValidationSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const { email, username, password } = req.body
    const user = await User.findOne({
      $or: [{ email: email }, { username: username }]
    })

    const isValidPassword = user.checkPassword(password)
    if (!isValidPassword || !user) {
      return res.status(400).json({ error: 'Invalid password or Username' })
    }

    if (!user.verified) {
      return res.status(403).json({ error: 'Email not verified' })
    }

    if (user.twoFactorEnabled) {
      user.generateOtpToken()
      await user.save()
      const emailText = `This is your otp code : 
      ${user.otpCode}
    `
      await sendMail(user.email, 'Please verify your code', emailText)
      console.log(user.otpCode)
      return res
        .status(200)
        .json({ message: 'OTP code sent. Please check your email.' })
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })

    res.status(200).json({ token: accessToken })
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
    ${process.env.CLIENT_URL}/api/verify-email?token=${newUser.emailVerificationToken}`
    await sendMail(newUser.email, 'Please verify your email', emailText)

    res.status(201).json({ token: accessToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken)
      return res.status(401).json({ message: 'Refresh Token is MISSING' })
    console.log('sa', refreshToken)
    const decoded = jwt.verify(refreshToken, process.env.RESET_TOKEN_SECRET)

    const findUser = await User.findById(decoded.userId)
    if (!findUser) return res.status(404).json({ message: 'User Not Found' })

    const newToken = generateAccessToken(findUser)
    console.log('NEW', newToken)
    res.status(200).json({ token: newToken })
  } catch (error) {
    res.status(401).json({ message: error.message })
  }
}

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email: email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    user.generatePasswordResetToken()
    await user.save()
    if (user.resetPasswordExpires < Date.now())
      return res.status(401).json({ message: 'Token Time Expired' })
    const emailText = `Please click the following link to verify your email for reset password: 
    ${process.env.CLIENT_URL}/api/reset-password?token=${user.resetPasswordToken}`
    await sendMail(user.email, 'Please verify your email', emailText)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body
    const user = await User.findOne({ resetPasswordToken: req.query.token })
    if (!user || user.resetPasswordExpires < Date.now()) {
      return res.status(400).json({ message: 'Invalid or expired token.' })
    }
    user.password = newPassword
    user.resetPasswordToken = undefined
    user.resetPasswordExpires = undefined
    await user.save()
    const emailText = `Your password has been successfully reseted &#128540;`
    await sendMail(user.email, 'Successfully Reseted', emailText)
    res.redirect(process.env.CLIENT_URL + '/')
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const verifyEmail = async (req, res) => {
  try {
    console.log(req.query.token)
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

export const verifyOtp = async (req, res) => {
  try {
    const { userId, otpCode } = req.body
    const user = await User.findById(userId)

    if (!user || user.otpCode !== otpCode) {
      return res.status(400).json({ error: 'Invalid OTP code' })
    }
    res.status(200).json({ message: 'OTP code verified successfully' })
    await user.save()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('refreshToken')
    res.json({ message: 'Logout successful' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
