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
      default: 'default-avatar-profile-icon-social-600nw-1677509740.webp'
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
    isActive: { type: Boolean, default: true },
    otpCode: { type: String },
    otpCodeExpires: { type: Date },
    verified: { type: Boolean, default: false },
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscriptionRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    subscriptions: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    likes: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    conversations: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
    groups: [{ type: Schema.Types.ObjectId, ref: 'Conversation' }],
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
    googleId: { type: String },
    role: {
      type: String,
      enum: ['Admin', 'User', 'superAdmin'],
      default: 'User'
    }
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
