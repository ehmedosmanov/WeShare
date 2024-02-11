import Cookies from 'js-cookie'
import { api } from './api'

// export const fetchToken = async () => {
//   try {
//     const response = await api.get('http://localhost:8000/api/getToken', {
//       withCredentials: true
//     })
//     const token = response.data.token
//     console.log(token)
//     if (token) {
//       Cookies.set('accessToken', token)
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const authWithGoogle = async () => {
//   try {
//     const response = await api.get('/auth/google')
//     const { accessToken, refreshToken } = response.data
//     return response.data
//   } catch (error) {
//     throw new Error('Error getting google auth')
//   }
// }

export const authRegister = async data => {
  try {
    const response = await api.post('/auth/register', data)
    return response.data
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const authLogin = async data => {
  try {
    const response = await api.post('/auth/login', data)
    return response.data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const authStatus = async () => {
  try {
    const res = await api.get('/auth/status')
    const data = res.data
    return data
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
