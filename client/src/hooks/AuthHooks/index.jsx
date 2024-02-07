import { api } from '@/services/api'
import { authRegister, authLogin, authStatus } from '@/services/auth-service'
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'sonner'

export const useRegister = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => authRegister(data),
    mutationKey: ['register'],
    onError: (err, previousValue, variables) => {
      console.log('insAllah consoleda gorsenerse', err)
      if (err.response) {
        const { data } = err.response
        if (data.error === 'User Already Exist') {
          toast.error('User with this email or username already exists.')
        } else {
          toast.error(
            'An error occurred during registration. Please try again.'
          )
        }
      } else {
        console.error('Register error BURDA:', err)
        toast.error('Failed to connect to the server. Please try again later.')
      }
      queryClient.setQueryData(['me'], previousValue)
    },
    onSuccess: () => {
      toast.success(
        'Registration successful! Please go to verify your registration from email address'
      )
    },
    onMutate: async newUser => {
      await queryClient.cancelQueries(['me'])
      const previousValue = queryClient.getQueryData(['me'])
      queryClient.setQueryData(['me'], newUser)
      return previousValue
    },
    onSettled: () => {}
  })
}

export const useLogin = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => authLogin(data),
    mutationKey: ['login'],
    onError: (err, previousValue) => {
      if (err.response) {
        const { error } = err.response.data
        if (error === 'Invalid password or Username') {
          toast.error('Invalid username or password.')
        } else if (error === 'Email not verified') {
          toast.error('Email not verified.')
        } else if (
          error === 'Too many login attempts, please try again later.'
        ) {
          toast.error('Too many login attempts, please try again later.')
        } else {
          toast.error('An error occurred during login. Please try again.')
        }
      } else {
        console.error('Register error BURDA:', err)
        toast.error('Failed to connect to the server. Please try again later.')
      }
      queryClient.setQueryData(['me'], previousUser)
    },
    onSuccess: () => {
      toast.success('Welcome back!')
      queryClient.invalidateQueries(['me', 'users'])
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
