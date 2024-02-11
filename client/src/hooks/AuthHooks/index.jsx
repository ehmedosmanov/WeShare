import { api } from '@/services/api'
import { authRegister, authLogin, authStatus } from '@/services/auth-service'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

export const useRegister = () => {
  return useMutation({
    mutationFn: data => authRegister(data),
    mutationKey: ['register'],
    onError: error => {
      if (error) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to connect to the server. Please try again later.')
      }
    },
    onSuccess: () => {
      toast.success(
        'Registration successful! Please go to verify your registration from email address'
      )
    }
  })
}

export const useLogin = () => {
  return useMutation({
    mutationFn: data => authLogin(data),
    mutationKey: ['login'],
    onError: error => {
      if (error) {
        toast.error(error.response.data.message)
      } else {
        toast.error('Failed to connect to the server. Please try again later.')
      }
    },
    onSuccess: () => {
      toast.success('Welcome back!')
    }
  })
}

export const useIsAuth = () => {
  return useQuery({
    queryFn: () => authStatus(),
    queryKey: ['status'],
    staleTime: 1000 * 60 * 5,
    onSuccess: data => {
      if (data && data?.isAuthenticated) {
        console.log('bu nedi ala', data.isAuthenticated)
        toast.success('is auth User is authenticated')
      }
    },
    onError: err => {
      if (err) {
        toast.error('is auth erroru:', err.message)
      }
    }
  })
}

export const useVerifyEmail = () => {
  const location = useLocation()
  const token = new URLSearchParams(location.search).get('token')
  return useQuery({
    queryFn: () => api.get(`/auth/verify-email?token=${token}`),
    queryKey: ['verifyEmail'],
    enabled: !!token,
    onSuccess: data => {
      toast.success('Account successfully registered')
    },
    onError: error => {
      toast.error(`Verification failed verify errori: ${error.message}`)
    }
  })
}
