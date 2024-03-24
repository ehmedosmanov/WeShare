import { api } from './api'

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

export const createUser = async data => {
  try {
    const res = await api.post(`/user/createUser`, data)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const deleteUsers = async id => {
  try {
    console.log(id)
    const res = await api.delete(`/user/deleteUser/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const updateUser = async id => {
  try {
    console.log(id)
    const res = await api.put(`/user/updateUser/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getUserById = async id => {
  try {
    const res = await api.get(`/user/getUserById/${id}`)
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
    console.log('bura ne gelir', data)
    const res = await api.post(`/user/save-history/${data}`)
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

export const deleteFromSearchHistoryUser = async data => {
  try {
    console.log('why delete from search history')
    const res = await api.delete(`/user/delete-history/${data}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
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

// export const getUserSavedPosts = async ({ queryKey, pageParam = 1 }) => {
//   try {
//     const [_key, id] = queryKey
//     console.log('user posts', id)
//     console.log('user posts s', pageParam)
//     const res = await api.get(`/user/saved-posts?page=${pageParam}`)
//     if (!res.data) {
//       throw new Error('No data received from server')
//     }
//     return res.data
//   } catch (error) {
//     console.log(error)
//     throw error
//   }
// }

export const getUserPosts = async ({ queryKey, pageParam = 1 }) => {
  try {
    const [_key, id] = queryKey
    console.log('user posts', id)
    console.log('user posts s', pageParam)
    const res = await api.get(`/user/user-posts/${id}?page=${pageParam}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const removeFromFollowers = async id => {
  try {
    console.log(`Removing ${id} from `)
    const res = await api.delete(`/user/remove-follower/${id}`)
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

export const changeAvatar = async data => {
  try {
    const res = await api.put(`/user/change-avatar/`, data)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
