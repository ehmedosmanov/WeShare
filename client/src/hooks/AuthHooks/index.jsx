import { api } from '@/services/api'
import {
  authRegister,
  authLogin,
  authStatus,
  authVerify
} from '@/services/auth-service'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
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
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => authLogin(data),
    mutationKey: ['login'],
    onError: error => {
      if (error) {
        console.log(error)
        toast.error(error.response.data.error)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['status'] })
      toast.success('Welcome back!')
    }
  })
}

export const useIsAuth = () => {
  return useQuery({
    queryFn: () => authStatus(),
    queryKey: ['status'],
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

export const useLogOut = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => api.post('/auth/logout'),
    onSuccess: data => {
      console.log(data.data.message)
      navigate('/auth/login')
      queryClient.invalidateQueries({ queryKey: ['status'] })
      queryClient.removeQueries({ queryKey: ['me'] })
      queryClient.setQueryData(['status'], { isAuthenticated: false })
    }
  })
}
