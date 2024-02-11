import User from '../models/user.model.js'
import { profileSchema } from '../validators/profile-validations.js'
import bcrypt from 'bcrypt'
export const getUserProfile = async (req, res) => {
  try {
    const { id } = req.params

    const findUser = await User.findById(id).populate(
      'followers following posts'
    )
    if (!findUser) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(findUser)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { id, data } = req.body
    const { error } = profileSchema.validate(data)
    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    const user = await User.findByIdAndUpdate(id, { $set: data }, { new: true })

    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json({ message: 'User successfully updated' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const { _id } = req.user

    const findCurrentUser = await User.findById(_id)

    const isValidPassword = findCurrentUser.checkPassword(oldPassword)

    if (!isValidPassword)
      return res.status(400).json({ message: 'Password is not valid' })

    const findUser = await User.findByIdAndUpdate(
      _id,
      {
        password: newPassword
      },
      { new: true }
    )
    if (!findUser) return res.status(404).json({ message: 'User not found' })

    await findUser.save()
    res.status(200).json({ message: 'Password changed successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
