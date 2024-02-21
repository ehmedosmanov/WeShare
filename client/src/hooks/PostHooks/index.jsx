import { toast } from 'sonner'
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import {
  addCommentToPost,
  addLikeToPost,
  deleteComment,
  getAllPosts,
  getFollowingsPosts,
  getLikesFromPost,
  getPost,
  getPostComments,
  uploadPost
} from '@/services/post-service'

export const useGetAllPosts = () => {
  return useQuery({
    queryFn: () => getAllPosts(),
    staleTime: 1000 * 60 * 2,
    queryKey: ['allPosts']
  })
}

export const useGetFollowingsPosts = () => {
  return useInfiniteQuery({
    queryFn: getFollowingsPosts,
    queryKey: ['followingsPosts'],
    getNextPageParam: lastPage => {
      return lastPage.posts.length ? lastPage.nextPage : null
    }
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

export const useDeleteComment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: id => deleteComment(id),
    mutationKey: ['deleteComment'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['postComments'] })
    }
  })
}

export const useAddLikeToPost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: id => addLikeToPost(id),
    mutationKey: ['addLikeToPost'],
    onSuccess: (postId, variables, context) => {
      // console.log('postiD', postId)
      // const oldData = queryClient.getQueryData('followingsPosts')

      // console.log('old data', oldData)
      // // Update the specific post in the cache
      // const newData = oldData.map(post =>
      //   post.id === variables ? { ...post, likes: post.likes + 1 } : post
      // )

      // // Update the cache with the new data
      //queryClient.setQueryData('followingsPosts', newData)
      // queryClient.invalidateQueries({
      //   queryKey: ['followingsPosts']
      // })
      queryClient.invalidateQueries({
        queryKey: ['postLikes', postId]
      })
      queryClient.invalidateQueries({
        queryKey: ['me']
      })
    }
  })
}

export const useGetLikesByPost = id => {
  return useQuery({
    queryFn: () => getLikesFromPost(id),
    staleTime: 1000 * 60 * 3,
    queryKey: ['postLikes', id]
  })
}
