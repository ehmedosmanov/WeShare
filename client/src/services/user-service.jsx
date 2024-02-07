import { api } from './api'

export const getMeUser = async () => {
  try {
    const res = await api.get('/user/me')
    console.log(res)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getUsers = async () => {
  try {
    const res = await api.get('/user/users')
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}
