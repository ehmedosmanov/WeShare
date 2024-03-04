import {
  createGroup,
  deleteGroup,
  getGroup,
  getGroupMessages,
  sendGroupMessage
} from '@/services/chat-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useCreateGroupChat = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => createGroup(data),
    mutationKey: ['groupChat'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] })
    }
  })
}

export const useDeleteGroupChat = id => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => deleteGroup(id),
    mutationKey: ['deleteChat'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inbox'] })
      queryClient.invalidateQueries({ queryKey: ['messages', id] })
    }
  })
}

export const useGetGroups = () => {
  return useQuery({
    queryFn: getGroup,
    staleTime: 1000 * 60,
    queryKey: ['groups']
  })
}

export const useGetGroupMessages = id => {
  return useQuery({
    queryFn: () => getGroupMessages(id),
    staleTime: 1000 * 60,
    queryKey: ['groupMessages', id],
    refetchOnWindowFocus: true
  })
}

export const useGroupSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => sendGroupMessage(data),
    mutationKey: ['sendMessageGroup'],
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['messages', data.id] })
      // queryClient.invalidateQueries({ queryKey: ['messages'] })
    }
  })
}
