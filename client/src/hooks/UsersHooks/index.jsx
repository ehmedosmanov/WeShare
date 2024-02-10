import {
  followUser,
  getMeUser,
  getSearchHistotyUser,
  getUserFollowers,
  getUserProfile,
  getUsers,
  saveSearchHistoryUser
} from '@/services/user-service'
import { toast } from 'sonner'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetMe = () => {
  return useQuery({
    queryFn: () => getMeUser(),
    staleTime: 1000 * 60 * 5,
    queryKey: ['me'],
    onError: err => {
      if (err) {
        toast.error(err.message)
      }
    }
  })
}

export const useGetUsers = () => {
  return useQuery({
    queryFn: () => getUsers(),
    queryKey: ['users'],
    staleTime: 1000 * 60 * 5,
    onError: err => {
      if (err) {
        toast.error(err.message)
      }
    }
  })
}

export const useGetSearchHistory = () => {
  return useQuery({
    queryKey: ['searchHistory'],
    queryFn: () => getSearchHistotyUser() || [],
    staleTime: 1000 * 60 * 5,
    onError: err => {
      if (err) {
        toast.error('Error Occured In Search History:', err.message)
      }
    }
  })
}

export const useSaveSearchHistory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => saveSearchHistoryUser(data),
    mutationKey: ['saveSearchHistory'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] })
    },
    onError: err => {
      if (err.response) {
        const { data } = err.response
        if (data.error === 'User Already Exist') {
          return toast.error('User with this email or username already exists.')
        }
      } else {
        toast.error('Failed to connect to the server. Please try again later.')
      }
    }
  })
}

export const useGetUserProfile = id => {
  return useQuery({
    queryKey: ['userProfile', id],
    queryFn: () => getUserProfile(id),
    staleTime: 1000 * 60 * 5,
    onSuccess: () => {},
    onError: err => {
      if (err) {
        toast.error('Error Occured In Get User Profile:', err.message)
      }
    }
  })
}

export const useGetUserFollowers = id => {
  return useQuery({
    queryKey: ['userFollowers', id],
    queryFn: () => getUserFollowers(id)
  })
}

export const useFollowUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: id => followUser(id),
    mutationKey: ['followUser'],
    onSuccess: id => {
      toast.success('User Profile', id)
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      queryClient.invalidateQueries({ queryKey: ['users'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile', id] })
    },
    onError: error => {
      toast.error(error.response.data.message)
    }
  })
}

//TODO: UNFOLLOWUSER
//TODO: GETFOLLOWERS
//TODO: GETFOLLOWING
//TODO: CURRENT ACCOUNT FOLLOWERS FOLLOWING
