import User from '../models/user.model.js'

// TODO: Change Email
// TODO: Follow,Unfollow
// TODO: Private Account, (Account Controller)

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

export const getUser = async (req, res) => {
  try {
    const currentUser = req.user
    res.json(currentUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('')
    res.json(users)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const findUser = await User.findById(userId).populate('followers following')
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(findUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
