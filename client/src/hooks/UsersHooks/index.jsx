import { getMeUser, getUsers } from '@/services/user-service'
import { toast } from 'sonner'
import { useQuery } from '@tanstack/react-query'

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
