import {
  changeAvatar,
  changeUserPassword,
  createUser,
  deleteFromSearchHistoryUser,
  deleteUsers,
  followUser,
  getMeUser,
  getSearchHistotyUser,
  getUserById,
  getUserFollowers,
  getUserFollowings,
  getUserPosts,
  getUserProfile,
  getUsers,
  removeFromFollowers,
  saveSearchHistoryUser,
  unfollowUser,
  updateProfile,
  updateUser
} from '@/services/user-service'
import { toast } from 'sonner'
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'

export const useGetMe = () => {
  return useQuery({
    queryFn: () => getMeUser(),
    staleTime: 1000 * 60,
    queryKey: ['me'],
    onError: error => {
      console.log(error)
      toast.error(error.response.data.error)
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
    staleTime: 1000 * 60,
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
    staleTime: 1000 * 60,
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
    queryFn: () => getUserFollowers(id),
    staleTime: 1000 * 60
  })
}

export const useGetUserFollowings = id => {
  return useQuery({
    queryKey: ['userFollowings', id],
    queryFn: () => getUserFollowings(id),
    staleTime: 1000 * 60
  })
}

export const useFollowUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: id => followUser(id),
    mutationKey: ['followUser'],
    onSuccess: id => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['userFollowers'] })
      queryClient.invalidateQueries({ queryKey: ['userFollowings'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile', id] })
    },
    onError: data => {
      toast.error('Error ocured in follow user:', data.response.data.message)
    }
  })
}

export const useUnFollowUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: id => unfollowUser(id),
    mutationKey: ['unFollowUser'],
    onSuccess: id => {
      queryClient.refetchQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['userFollowers'] })
      queryClient.invalidateQueries({ queryKey: ['userFollowings'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile', id] })
    },
    onError: error => {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })
}

export const useRemoveFromFollower = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: id => removeFromFollowers(id),
    mutationKey: ['removeFromFollowers'],
    onSuccess: id => {
      console.log(id)
      queryClient.refetchQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['userFollowers'] })
      queryClient.invalidateQueries({ queryKey: ['userFollowings'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile', id] })
    },
    onError: error => {
      console.log(error)
      toast.error(error.response.data.message)
    }
  })
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => updateProfile(data),
    mutationKey: ['updateSettings'],
    onSuccess: data => {
      toast.success(data.message)
      const { id } = data
      queryClient.refetchQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile', id] })
    },
    onError: error => {
      console.log(error)
      toast.error(error.response.data.error)
    }
  })
}

export const useChangePassword = () => {
  return useMutation({
    mutationFn: data => changeUserPassword(data),
    mutationKey: ['changePassword'],
    onSuccess: () => toast.success('Password changed successfully'),
    onError: error => toast.error(error.response.data.error)
  })
}

export const useGetUserPosts = id => {
  return useInfiniteQuery({
    queryFn: getUserPosts,
    staleTime: 2000 * 60,
    queryKey: ['userPosts', id],
    getNextPageParam: (lastPage, allPages) =>
      lastPage.nextPage ? lastPage.nextPage : false,
    refetchOnWindowFocus: true
  })
}

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => changeAvatar(data),
    mutationKey: ['updateAvatar'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.invalidateQueries({ queryKey: ['userProfile'] })
    }
  })
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => createUser(data),
    mutationKey: ['createUser'],
    onSuccess: data => {
      if (data) {
        queryClient.invalidateQueries({ queryKey: ['users'] })
        toast.success('User created successfully')
      }
    },
    onError: error => {
      if (error) {
        toast.error(error.response.data.message)
      }
    }
  })
}

export const useGetUserById = id => {
  return useQuery({
    queryFn: () => getUserById(id),
    queryKey: ['userId', id]
  })
}

export const useUpdateUser = id => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => updateUser(id),
    mutationKey: ['updateUser', id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userId', id] })
      toast.success('User Updated successfully')
    }
  })
}

export const useDeleteUser = id => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteUsers(id),
    mutationKey: ['deleteUser', id],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted successfully')
    }
  })
}

export const useDeleteFromHistory = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => deleteFromSearchHistoryUser(data),
    mutationKey: ['deleteFromSearchHistory'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['searchHistory'] })
    }
  })
}
