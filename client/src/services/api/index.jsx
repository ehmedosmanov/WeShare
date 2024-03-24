import axios from 'axios'

const API_URL = 'https://weshareserver.onrender.com/api'

export const api = axios.create({
  baseURL: `${API_URL}`,
  withCredentials: true
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        if (error.response.data.message === 'jwt expired') {
          const res = await axios.get(`${API_URL}/auth/refresh`, {
            withCredentials: true
          })
          return api(originalRequest)
        } else {
          return Promise.reject(error)
        }
      } catch (error) {
        console.log(error.message)
        delete originalRequest._retry
      }
    }
    return Promise.reject(error)
  }
)
