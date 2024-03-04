import { api } from './api'

export const sendMessage = async data => {
  try {
    const { id, message } = data
    console.log(message)
    const res = await api.post(`/message/send/${id}`, { message: message })
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const sendVoiceMessage = async ({ id, formData }) => {
  try {
    const res = await api.post(`/message/sendVoice/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getMessages = async id => {
  try {
    console.log('mes', id)
    const res = await api.get(`/message/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getGroupMessages = async id => {
  try {
    const res = await api.get(`/group/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const sendGroupMessage = async data => {
  try {
    const { id, message } = data
    console.log(message)
    const res = await api.post(`/group/send/${id}`, { message: message })
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const getUserInbox = async () => {
  try {
    const res = await api.get('/message')
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    throw error
  }
}

export const createGroup = async formData => {
  try {
    console.log('why', formData)
    const res = await api.post('/group/createGroup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    throw error
  }
}

export const getGroup = async () => {
  try {
    const res = await api.get('/group/getGroup')
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    throw error
  }
}

export const deleteGroup = async id => {
  try {
    const res = await api.delete(`/group/deleteGroup/${id}`)
    if (!res.data) {
      throw new Error('No data received from server')
    }
    return res.data
  } catch (error) {
    console.log(error)
    throw error
  }
}
