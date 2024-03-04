import { getObjectSignedUrl } from '../helpers/s3.js'
import { startTwoFactorAuthentication, verifyOTP } from '../helpers/twilio.js'
import { checkRole } from '../middleware/authenticate.js'
import User from '../models/user.model.js'
import sendMail from '../services/send-email.js'
import bcrypt from 'bcrypt'

export const enableTwoFactorAuthentication = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.twoFactorEnabled = true
    await user.save()
    res
      .status(200)
      .json({ message: 'Two-factor authentication enabled successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const disableTwoFactorAuthentication = async (req, res) => {
  try {
    const { userId } = req.body
    const user = await User.findById(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    user.twoFactorEnabled = false
    await user.save()
    res
      .status(200)
      .json({ message: 'Two-factor authentication disabled successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const TwoFactorAuthentication = async (req, res) => {
  const { phoneNumber } = req.body
  try {
    await startTwoFactorAuthentication(phoneNumber)
    res.status(200).json({ message: 'OTP code sent successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const verify2FAOTP = async (req, res) => {
  const { phoneNumber, otpCode } = req.body
  try {
    await verifyOTP(phoneNumber, otpCode)
    res.status(200).json({ message: 'OTP code verified successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUser = async (req, res) => {
  try {
    const currentUser = req.user

    console.log(currentUser)
    const user = await User.findById(currentUser?.userId)
      .populate('following')
      .populate('followers')
      .populate({
        path: 'conversations',
        populate: [
          { path: 'participants', model: 'User' },
          { path: 'messages', model: 'Message' }
        ]
      })
      .populate({
        path: 'groups',
        populate: [
          { path: 'participants', model: 'User' },
          { path: 'messages', model: 'Message' }
        ]
      })
      .populate('searchHistory')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    user.avatar = await getObjectSignedUrl(user.avatar)

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const { userId } = req.user
    const users = await User.find().populate('')

    console.log('why', userId)

    const filteredUsers = users.filter(
      user => user.verified && user._id.toString() !== userId.toString()
    )

    const avatars = filteredUsers.map(async user => {
      const avatar = await getObjectSignedUrl(user?.avatar)
      return { ...user._doc, avatar }
    })

    const result = await Promise.all(avatars)

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate('')

    const filterVerifiedUsers = users.filter(x => x.verified)

    const avatars = filterVerifiedUsers.map(async user => {
      const avatar = await getObjectSignedUrl(user?.avatar)
      return { ...user._doc, avatar }
    })

    const result = await Promise.all(avatars)

    console.log('getusers', result)

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const searchHistory = async (req, res) => {
  try {
    const currentUser = req.user
    const user = await User.findById(currentUser?.userId).populate(
      'searchHistory'
    )
    if (!user) return res.status(404).json({ message: 'User not found' })

    let searchHistory = [...user.searchHistory] || []

    searchHistory = searchHistory.reverse()

    const avatars = searchHistory.map(async user => {
      const avatar = await getObjectSignedUrl(user?.avatar)
      return { ...user._doc, avatar }
    })
    const result = await Promise.all(avatars)

    console.log(result)

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteFromHistory = async (req, res) => {
  try {
    const { id } = req.params
    const currentUser = req.user
    const user = await User.findById(currentUser?.userId).populate(
      'searchHistory'
    )
    const findUser = await User.findById(id)

    if (!findUser) return res.status(404).json({ message: 'User not found' })

    if (!user) return res.status(404).json({ message: 'User not found' })

    let searchHistory = user.searchHistory || []

    searchHistory = searchHistory.filter(
      x => x._id.toString() !== findUser._id.toString()
    )

    user.searchHistory = searchHistory
    await user.save()
    res.status(200).json({
      message: 'User deleted from history successfully'
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const saveSearchHistory = async (req, res) => {
  try {
    const { id } = req.params
    console.log(`saveSearchHistory`, id)
    const user = await User.findById(req.user.userId)
    const findUser = await User.findById(id)
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    const isAlreadySearching = user.searchHistory.some(
      x => x._id.toString() === id
    )

    if (!isAlreadySearching) {
      user.searchHistory.push(findUser)
    } else {
      user.searchHistory.pull(findUser)
      user.searchHistory.push(findUser)
    }
    await user.save()

    res.json({ message: 'User added to search history' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const removeFromFollowers = async (req, res) => {
  try {
    const { id } = req.params
    const { userId } = req.user

    await User.findByIdAndUpdate(
      userId,
      { $pull: { followers: id } },
      { new: true }
    )

    await User.findByIdAndUpdate(
      id,
      { $pull: { following: userId } },
      { new: true }
    )

    res.status(200).json({ message: 'removed from followers successfully' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
  }
}

export const followUser = async (req, res) => {
  try {
    const { id } = req.body
    const currentUser = req.user

    if (id === currentUser.userId) {
      return res.status(403).json({ message: 'You cant follow yourself' })
    }

    await User.findByIdAndUpdate(
      currentUser.userId,
      {
        $addToSet: { following: id }
      },
      { new: true }
    )
    await User.findByIdAndUpdate(
      id,
      {
        $addToSet: { followers: currentUser.userId }
      },
      { new: true }
    )

    res.status(200).json({ message: 'User followed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const unFollowUser = async (req, res) => {
  try {
    const { id } = req.body
    const { userId } = req.user

    if (id === userId) {
      return res.status(403).json({ message: 'You cant unfollow yourself' })
    }

    const followedUser = await User.findById(id)

    if (!followedUser)
      return res.status(404).json({ message: 'User not found' })

    //Follow eden userin followedler update olunur
    await User.findByIdAndUpdate(
      userId,
      {
        $pull: { following: followedUser._id }
      },
      {
        new: true
      }
    )

    //Follow olunan userin followersleri update olunur
    await User.findByIdAndUpdate(
      followedUser._id,
      {
        $pull: { followers: userId }
      },
      { new: true }
    )
    res.status(200).json({ message: 'User unfollowed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserFollowers = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('followers')
    if (!user) return res.status(404).json({ message: 'User not found' })

    const followers = user.followers

    const avatars = followers.map(async user => {
      const avatar = await getObjectSignedUrl(user?.avatar)
      return { ...user._doc, avatar }
    })

    const result = await Promise.all(avatars)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserFollowings = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id).populate('following')
    if (!user) return res.status(404).json({ message: 'User not found' })

    const following = user.following

    const avatars = following.map(async user => {
      const avatar = await getObjectSignedUrl(user?.avatar)
      return { ...user._doc, avatar }
    })

    const result = await Promise.all(avatars)

    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createUser = async (req, res) => {
  try {
    const roleCheck = checkRole(req, res, req.body.role)
    if (roleCheck) return roleCheck

    const { firstName, lastName, username, email, password } = req.body

    const userExist = await User.findOne({
      $or: [{ email: email }, { username: username }]
    })

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

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

    const emailText = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Email Verification</title>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }
  .container {
    max-width: 600px;
    margin: 50px auto;
    background-color: #ffffff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  h2 {
    margin-top: 0;
  }
  p {
    margin-bottom: 20px;
  }
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #007bff;
    color: #ffffff;
    text-decoration: none;
    border-radius: 5px;
  }
  .button:hover {
    background-color: #0056b3;
  }
</style>
</head>
<body>
<div class="container">
  <h2>Email Verification</h2>
  <p>Please click the following link to verify your email:</p>
  <a class="button" href="${process.env.CLIENT_URL}/Auth/Verified?token=${newUser.emailVerificationToken}">Verify Email</a>
</div>
</body>
</html>
`

    await sendMail(newUser.email, 'Please verify your email', emailText)

    res.status(200).json({ message: 'Please Verifry Email' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateUser = async (req, res) => {
  try {
    const { password } = req.body
    const { id } = req.params

    console.log(passwrd)
    s
    const roleCheck = checkRole(req, res, req.body.role)
    if (roleCheck) return roleCheck

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: 'At least one field is required to update' })
    }

    if (password) {
      const user = await User.findById(id)
      if (!user) {
        return res.status(404).json({ message: 'User not found' })
      }
      const isValid = await user.isValidPassword(password)
      if (!isValid) {
        return res.status(400).json({ message: 'Invalid password' })
      }

      req.body.password = await bcrypt.hash(password, 10)
    }

    const findAndUpdateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true
    })

    const isValidPassword = findAndUpdateUser.checkPassword(password)

    if (!findAndUpdateUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ message: 'User updated' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const roleCheck = checkRole(req, res, req.body.role)
    if (roleCheck) return roleCheck

    const { id } = req.params
    const findUser = await User.findByIdAndDelete(id)

    if (!findUser) {
      return res.status(404).json({ message: 'Not Found' })
    }
    res.status(200).json({ message: 'User Deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' })
  }
}

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params
    const findUser = await User.findById(id)
    if (!findUser) return res.status(404).json({ message: 'Not Found' })

    res.status(200).json(findUser)
  } catch (error) {
    res.status(500).json({ message: 'Error' })
  }
}
