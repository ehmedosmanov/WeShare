import User from '../models/user.model.js'
import sendMail from '../services/send-email.js'
import { oauth2Client } from '../helpers/oauth2-client.js'
import { google } from 'googleapis'
import crypto from 'crypto'
import {
  generateAccessToken,
  generateRefreshToken
} from '../utils/generate-tokens.js'
import userValidationSchema from '../validators/user-validation.js'
import jwt from 'jsonwebtoken'
import { registerSchema } from '../validators/auth-validations.js'
// TODO: ADD OAUTH GOOGLE

export const authWithGoogle = async (req, res) => {
  try {
    const { tokens } = await oauth2Client.getToken(req.query.code)
    oauth2Client.setCredentials(tokens)
    const people = google.people({ version: 'v1', auth: oauth2Client })
    const me = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses,names,photos'
    })

    console.log(me)

    let user = await User.findOne({
      email: me.data.emailAddresses[0].value
    })
    if (!user) {
      const avatarUrl = me.data.photos
        ? me.data.photos.url
        : 'default-avatar-url'
      user = new User({
        avatar: avatarUrl,
        firstName: me.data.names[0].givenName,
        lastName: me.data.names[0].familyName || ' ',
        username: `${me.data.names[0].givenName}${
          me.data.names[0].familyName || ' '
        }`,
        email: me.data.emailAddresses[0].value,
        password: crypto.randomBytes(20).toString('hex'),
        googleId: me.data.resourceName.split('/')[1],
        verified: true
      })
      await user.save()
    }

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      origin: process.env.CLIENT_URL,
      secure: true,
      sameSite: 'None',
      maxAge: 30 * 24 * 60 * 60 * 1000
    })

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      origin: process.env.CLIENT_URL,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })

    res.redirect(process.env.CLIENT_URL)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getOauth = async (req, res) => {
  try {
    const url = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['profile', 'email']
    })
    res.json({ url })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const authStatus = async (req, res) => {
  try {
    const currentUser = req.user
    if (!currentUser) {
      return res.status(200).json({ isAuthenticated: false })
    } else {
      return res.status(200).json({ isAuthenticated: true })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

let loginAttempts = {}

export const login = async (req, res) => {
  try {
    // const { error } = loginSchema.validate(req.body)
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message })
    // }

    const { email, username, password } = req.body

    console.log(req.body)

    if (
      loginAttempts[username] &&
      loginAttempts[username].blockUntil > Date.now()
    ) {
      return res
        .status(429)
        .send('Too many login attempts, please try again later.')
    }

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }]
    })

    const isValidPassword = user.checkPassword(password)
    if (!isValidPassword || !user) {
      if (!loginAttempts[username]) {
        loginAttempts[username] = { attempts: 0 }
      }
      loginAttempts[username].attempts++
      if (loginAttempts[username].attempts >= 5) {
        loginAttempts[username].blockUntil = Date.now() + 60000
      }
      return res.status(400).json({ error: 'Invalid password or Username' })
    }

    loginAttempts[username] = { attempts: 0 }

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

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })

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
    // const { error } = registerSchema.validate(req.body)
    // if (error) {
    //   return res.status(400).json({ error: error.details[0].message })
    // }
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

    const emailText = `Please click the following link to verify your email: 
   ${process.env.CLIENT_URL}/Auth/Verified?token=${newUser.emailVerificationToken}`

    await sendMail(newUser.email, 'Please verify your email', emailText)

    res
      .status(201)
      .json({ message: 'Registration successful! Please verify your email.' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken)
      return res.status(401).json({ message: 'Refresh Token is MISSING' })
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)

    const findUser = await User.findById(decoded.userId)
    if (!findUser) return res.status(404).json({ message: 'User Not Found' })

    const newToken = generateAccessToken(findUser)
    res.cookie('accessToken', newToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })

    res.status(200).json({ token: newToken })
  } catch (error) {
    res.status(500).json({ message: error.message })
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
      return res.status(400).json({ message: 'Token Time Expired' })
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
    const { token } = req.query
    const user = await User.findOne({ emailVerificationToken: token })
    if (!user) {
      return res.status(400).json({ message: 'Invalid token.' })
    }

    user.verified = true
    user.emailVerificationToken = undefined
    await user.save()

    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'None'
    })
    res.status(200).json({ message: 'Account confirmed' })
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
