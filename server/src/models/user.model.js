import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import otpGenerator from 'otp-generator'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, text: true },
    lastName: { type: String, trim: true, text: true },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true
    },
    phoneNumber: { type: String, unique: true, trim: true, text: true },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    avatar: {
      type: String,
      trim: true,
      default:
        'https://weshare-socialmedia-app.s3.eu-north-1.amazonaws.com/vector-flat-illustration-grayscale-avatar-600nw-2281862025.webp?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCmV1LW5vcnRoLTEiRzBFAiEA%2BMJCgAETHnxHrTBVovwY5JlmENMGXFKTo3WUShf7njYCIFzXvz%2BPLlFcE7GEKS0kxsyq6Z1M61HjKLvYv3O%2BGigvKuQCCDYQABoMMDU4MjY0MjkzNDgxIgzZfOmY413DHoYx%2BhkqwQIRUiUMzQg3E6GlC4hFKs%2FybC6UYOKvRZKHu4nqpomhyDiybqq24XEZBF9dheDYd%2Fn3YsCn%2Bq7WzN49bKdh7Lc7j3iH23P4b%2FhrLaB%2B6SyQuSKvQtttLRfaE5iDKtM3dE7DMv2xhx91CDXFcQkJ0KmLvfW2gI4CHNYu3frIm6VEBiR8pcf%2FZnLae2Gce%2B08JNm1VgSedWT4kzXbmaRTZUH8Q6s6EBF79Xm7HPcJmNeW0GMTwJJ%2F%2FTrfN8SYzT9qdAfO7HdHtl3RDxuGMEPl6Q%2BvKbZlhEvV5lt2jPO4eEvMZswNbvRFxSU5%2B7draqvKAlSYz6RWVcB%2BBwd2lFAeQDJMru%2BMCrw4I98GAoA0ZRvconNbCaXrbpM3peO%2Fwu9kcN1EDhszpBoD2gaK%2FwTrK%2FEcx7kRSsMdhfhUYTYTtx8%2FocowuZTUrgY6swKMB3PPoJQtg6iDthLLwBMxkUKvzBOPFxsZJ8%2Fk0tDwhHYNaQK4FTP%2BdFbbR65Kq5S4nw1DM1MadsQ3jFbe291PGR3nMkEVpVhKdm%2FPfF2xRj9SNv80aFhHPXeJ7XFxGe3llMjBRnZbxf87HZVy%2BtRsghKXKbM2BBWf2%2FfFbFMXHFmELzsNpGyXH0RLl997CZ5sZppRIEuNrvjXrP3YKFlK23ICsWr3ph%2BJ%2B65RbV1V%2BCL12N1NR9xreTDUIDsr%2FGgyIXK6R5ok2nCM%2BZdxk4TIARaSln%2BRW6r9H9xdv5lebfwa2LUF7fH%2BvmojG%2FstLA0%2BJE8tzMlQagpVvZxf2q3jA5Y7i%2FXBHWo74j5AtmyOkV0h2%2B%2Fx%2F2fodJwnAm05LBb4SZi0wXAkvjKwkhYPc0zK2Rxs&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20240220T205227Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIAQ3EGSSBU2ME4W55V%2F20240220%2Feu-north-1%2Fs3%2Faws4_request&X-Amz-Signature=03a601d95bb9f2ebfb969ff3d3bbd03c9bd4e44044ee6f80ece247ffb524b5bc'
    },
    status: {
      type: String,
      enum: ['Online', 'Offline'],
      default: 'Offline'
    },
    bio: { type: String },
    twoFactorEnabled: { type: Boolean, default: false },
    gender: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    emailVerificationToken: { type: String },
    emailVerificationExpires: { type: Date },
    forgetPasswordToken: { type: String },
    forgetPasswordExpires: { type: Date },
    otpCode: { type: String },
    otpCodeExpires: { type: Date },
    verified: { type: Boolean, default: false },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    requests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    NotifyMeSettings: {
      someoneSentMeAMessage: { type: Boolean, default: true },
      someoneLikedMyPhoto: { type: Boolean, default: true },
      someoneSharedOnMyPhoto: { type: Boolean, default: true },
      someoneFollowedMe: { type: Boolean, default: true },
      someoneLikedMyPosts: { type: Boolean, default: true },
      someoneMentionedMe: { type: Boolean, default: true },
      someoneSentMeFollowRequest: { type: Boolean, default: true }
    },
    privateProfile: { type: Boolean, default: false },
    searchHistory: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    tagged: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    googleId: { type: String },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' }
  },
  { timestamps: true }
)

//Check User Password
userSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.methods.generatePasswordResetToken = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.resetPasswordExpires = Date.now() + 3600000 // Expires in an hour
}

userSchema.methods.generateForgetPasswordToken = function () {
  this.forgetPasswordToken = crypto.randomBytes(20).toString('hex')
  this.forgetPasswordExpires = Date.now() + 3600000 // Expires in an hour
}

userSchema.methods.emailVerification = function () {
  this.emailVerificationToken = crypto.randomBytes(20).toString('hex')
  this.emailVerificationExpires = Date.now() + 3600000 //Expires in an hour
}

userSchema.methods.generateOtpToken = function () {
  this.otpCode = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false
  })
  this.otpCodeExpires = Date.now() + 300000 // OTP expires in 5 minutes
}

//Hash Password Middleware
userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next()
  this.password = bcrypt.hashSync(this.password, 10)
  next()
})

userSchema.methods.toJSON = function () {
  const user = this.toObject()
  delete user.password
  delete user.resetPasswordToken
  delete user.forgetPasswordToken
  delete user.otpCode
  delete user.resetPasswordExpires
  delete user.emailVerificationToken
  delete user.emailVerificationExpires
  delete user.forgetPasswordExpires
  delete user.otpCodeExpires
  return user
}

const User = model('User', userSchema)

export default User
