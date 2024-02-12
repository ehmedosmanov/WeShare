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
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getSearchHistotyUser = async () => {
  try {
    const res = await api.get('/user/get-history')
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const saveSearchHistoryUser = async data => {
  try {
    const res = await api.post('/user/save-history', data)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    console.log(res)
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getUserProfile = async id => {
  try {
    const res = await api.get(`/user/get-profile/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const updateProfile = async data => {
  try {
    const { id } = data
    console.log(data)
    const res = await api.put(`/user/update-profile?id=${id}`, data)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const followUser = async id => {
  try {
    const res = await api.post('/user/follow-user', id)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const unfollowUser = async id => {
  try {
    const res = await api.post('/user/unfollow-user', id)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getUserFollowers = async id => {
  try {
    const res = await api.get(`/user/get-followers/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getUserFollowings = async id => {
  try {
    const res = await api.get(`/user/get-followings/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const changeUserPassword = async data => {
  try {
    console.log(data)
    const res = await api.put(`/user/change-password/`, data)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    throw error
  }
}
