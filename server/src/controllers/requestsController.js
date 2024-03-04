//From User and //To User
export const sendFollowRequest = (req, res) => {
  try {
    const { userId } = req.user
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
