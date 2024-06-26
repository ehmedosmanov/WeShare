import { useGetMe } from '@/hooks/UsersHooks'
import { createContext, useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'
import { useQueryClient } from '@tanstack/react-query'
export const SocketContext = createContext()

export const useSocketContext = () => {
  return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
  const [onlineUsers, setOnlineUsers] = useState([])
  const [socket, setSocket] = useState(null)
  const { data: user } = useGetMe()
  const queryClient = useQueryClient()

  useEffect(() => {
    if (user) {
      const socket = io('https://weshareserver.onrender.com', {
        query: {
          userId: user._id
        }
      })
      setSocket(socket)

      socket.on('getOnlineUsers', users => {
        setOnlineUsers(users)
      })

      socket.on('newMessage', newMessage => {
        console.log(newMessage)
        queryClient.invalidateQueries(['messages', newMessage.id])
        queryClient.setQueryData(['messages', newMessage.id], old => [
          ...old,
          newMessage
        ])
      })


      socket.on('newVoiceMessage', newVoiceMessage => {
        console.log(newVoiceMessage)
        queryClient.invalidateQueries(['messages', newVoiceMessage.id])
        queryClient.setQueryData(['messages', newVoiceMessage.id], old => [
          ...old,
          newVoiceMessage
        ])
      })



      return () => socket.close()
    } else {
      if (socket) {
        socket.close()
        setSocket(null)
      }
    }
  }, [user])

  const data = {
    socket,
    onlineUsers
  }
  return (
    <SocketContext.Provider value={data}>{children}</SocketContext.Provider>
  )
}
