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

    const user = await User.findById(currentUser?.userId)
      .populate('following')
      .populate('followers')
      .populate('searchHistory')
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).populate('')

    const filterVerifiedUsers = users.filter(x => x.verified)

    res.json(filterVerifiedUsers)
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

    res.json(searchHistory)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteFromHistory = async (req, res) => {
  try {
    const { id } = req.body
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
    const { id } = req.body
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

export const followUser = async (req, res) => {
  try {
    const { id } = req.body
    const currentUser = req.user
    console.log('Follow Edilen', req.body)
    console.log('Follow Eden', currentUser.userId)

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

    console.log('istifadeci unfollow eden', userId)
    console.log('unfollow olunan', id)

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
    console.log('Getting', id)
    const user = await User.findById(id).populate('followers')
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user.followers)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getUserFollowings = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user.following)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
