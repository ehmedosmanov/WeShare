import { api } from './api'
import { toast } from 'sonner'
export const getMeUser = async () => {
  try {
    const res = await api.get('/user/me')
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
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

export const getSearchHistotyUser = async () => {
  try {
    const res = await api.get('/user/get-history')
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const saveSearchHistoryUser = async data => {
  try {
    const res = await api.post('/user/save-history', data)
    console.log(res)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getUserProfile = async id => {
  try {
    const res = await api.get(`/user/get-profile/${id}`)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const followUser = async id => {
  try {
    const res = await api.post('/user/follow-user', id)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const unfollowUser = async id => {
  try {
    const res = await api.post('/user/unfollow-user', id)
    return res.data
  } catch (error) {
    console.log(error.message)
  }
}

export const getUserFollowers = async id => {
  try {
    const res = await api.get(`/user/get-followers/${id}`)
  } catch (error) {
    console.log(error.message)
  }
}
