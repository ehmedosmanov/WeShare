import {
  getMessages,
  getUserInbox,
  sendMessage,
  sendVoiceMessage
} from '@/services/chat-service'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useSendMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => sendMessage(data),
    mutationKey: ['sendMessage'],
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['messages', data.id] })
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    }
  })
}

export const useSendVoiceMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: data => sendVoiceMessage(data),
    mutationKey: ['sendVoiceMessage'],
    onSuccess: data => {
      queryClient.invalidateQueries({ queryKey: ['messages', data.id] })
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    }
  })
}

export const useGetMessages = id => {
  return useQuery({
    queryFn: () => getMessages(id),
    staleTime: 1000 * 60,
    queryKey: ['messages', id],
    refetchOnWindowFocus: true
  })
}

export const useGetInbox = () => {
  return useQuery({
    queryFn: () => getUserInbox(),
    staleTime: 1000 * 60,
    queryKey: ['inbox']
  })
}
