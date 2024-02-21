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
