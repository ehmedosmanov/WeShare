import { api } from './api'

export const getAllPosts = async () => {
  try {
    const res = await api.get('/post/get-posts')
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getFollowingsPosts = async ({ pageParam = 1 }) => {
  try {
    console.log(pageParam)
    const res = await api.get(`/post/get-followings-posts?page=${pageParam}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const uploadPost = async data => {
  try {
    console.log(data)
    const res = await api.post(`/post/add-post`, data)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPost = async id => {
  try {
    const res = await api.get(`/post/get-post/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getPostComments = async postId => {
  try {
    console.log(`Get post comments`)
    console.log(postId)
    console.log(`Get post comments`)

    const res = await api.get(`/comment/get-post-comments/${postId}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addCommentToPost = async data => {
  try {
    const res = await api.post(`/comment/add-comment/`, data)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deleteComment = async id => {
  try {
    console.log(id)
    const res = await api.delete(`/comment/delete-comment/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const deletePost = async data => {
  try {
    console.log(data)
    const res = await api.delete(`/post/delete-post/${data}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const addLikeToPost = async id => {
  try {
    const res = await api.post('/like/like-post', id)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getLikesFromPost = async id => {
  try {
    console.log('likes', id)
    const res = await api.get(`/like/get-likes/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const savePost = async id => {
  try {
    console.log('bura catr save id', id)
    const res = await api.post(`/like/save-post/`, { id })
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
