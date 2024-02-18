import { toast } from 'sonner'
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  addCommentToPost,
  deleteComment,
  getAllPosts,
  getFollowingsPosts,
  getPost,
  getPostComments,
  uploadPost
} from '@/services/post-service'

export const useGetAllPosts = () => {
  return useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['allPosts']
  })
}

export const useGetFollowingsPosts = () => {
  return useInfiniteQuery({
    queryFn: getFollowingsPosts,
    staleTime: 2000 * 60,
    queryKey: ['followingsPosts'],
    getNextPageParam: (lastPage, allPages) => lastPage.nextPage
  })
}

export const useUploadPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => uploadPost(data),
    mutationKey: ['uploadPost'],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['allPosts', 'followingsPosts']
      })
    }
  })
}

export const useGetPost = id => {
  return useQuery({
    queryFn: () => getPost(id),
    enabled: !!id,
    staleTime: 1000 * 60,
    queryKey: ['post', id]
  })
}

export const useGetPostComments = id => {
  return useQuery({
    queryFn: () => getPostComments(id),
    enabled: !!id,
    staleTime: 1000 * 60,
    queryKey: ['postComments', id]
  })
}

export const useAddCommentToPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => addCommentToPost(data),
    mutationKey: ['comment'],
    onSuccess: data => {
      console.log('====================================')
      console.log('Adddd')
      console.log(data)
      console.log('====================================')
      // queryClient.invalidateQueries({
      //   queryKey: ['postComments', data.post._id]
      // })
      queryClient.invalidateQueries({ queryKey: ['postComments'] })
    }
  })
}

export const useDeleteComment =()  => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteComment(id),
    mutationKey: ['deleteComment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postComments'] })
    }
  })
}
