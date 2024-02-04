import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import otpGenerator from 'otp-generator'

const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    firstName: { type: String, required: true, trim: true, text: true },
    lastName: { type: String, required: true, trim: true, text: true },
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
        'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'
    },
    cover: {
      type: String,
      trim: true,
      default: 'https://flowbite.com/docs/images/examples/image-3@2x.jpg'
    },
    status: {
      type: String,
      enum: ['Online', 'Offline'],
      default: 'Offline'
    },
    twoFactorEnabled: { type: Boolean, default: false },
    gender: { type: String },
    birthYear: { type: Number, trim: true },
    birthMonth: { type: Number, trim: true },
    birthDay: { type: Number, trim: true },
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
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    messagesSent: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    messagesReceived: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    eventsCreated: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    eventsParticipated: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    reels: [{ type: Schema.Types.ObjectId, ref: 'Reel' }],
    videos: [{ type: Schema.Types.ObjectId, ref: 'Video' }],
    music: [{ type: Schema.Types.ObjectId, ref: 'Music' }],
    groupChats: [{ type: Schema.Types.ObjectId, ref: 'GroupChat' }],
    videoCalls: [{ type: Schema.Types.ObjectId, ref: 'VideoCall' }],
    blockedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    oneToOneVideoCalls: [
      { type: Schema.Types.ObjectId, ref: 'OneToOneVideoCall' }
    ],
    voiceCalls: [{ type: Schema.Types.ObjectId, ref: 'VoiceCall' }],
    voiceMessages: [{ type: Schema.Types.ObjectId, ref: 'VoiceMessage' }],
    playlists: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }],
    NotifyMeSettings: {
      someoneSentMeAMessage: { type: Boolean, default: true },
      someoneLikedMyPhoto: { type: Boolean, default: true },
      someoneSharedOnMyPhoto: { type: Boolean, default: true },
      someoneFollowedMe: { type: Boolean, default: true },
      someoneLikedMyPosts: { type: Boolean, default: true },
      someoneMentionedMe: { type: Boolean, default: true },
      someoneSentMeFollowRequest: { type: Boolean, default: true }
    },
    searchHistory: [{ type: String }],
    details: { type: Schema.Types.Mixed },
    savedPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    marks: [{ type: Schema.Types.ObjectId, ref: 'Mark' }],
    googleId: { type: String },
    role: { type: String, enum: ['Admin', 'User'], default: 'User' },
    visibility: {
      type: String,
      enum: ['All Members', 'My Connections', 'Only Me'],
      default: 'All Members'
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

userSchema.methods.emailVerification = function () {
  this.emailVerificationToken = crypto.randomBytes(20).toString('hex')
  this.emailVerificationExpires = Date.now() + 3600000 //Expires in an hour
}

userSchema.methods.generateOtpToken = function () {
  this.otpCode = otpGenerator.generate(6, {
    digits: true,
    alphabets: falses,
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
