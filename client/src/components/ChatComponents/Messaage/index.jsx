import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useGetMessages } from '@/hooks/ChatHooks'
import { useGetMe } from '@/hooks/UsersHooks'
import useConversation from '@/hooks/use-conversation'
import { AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import moment from 'moment'
import { useSocketContext } from '@/context/SocketContext'
import { cn } from '@/lib/utils'
const Message = ({ message }) => {
  const { selectedConversation } = useConversation()
  const { data: currentUser } = useGetMe()
  const fromMe = message?.sender === currentUser?._id
  const formatTime = moment(message?.createdAt).fromNow()
  const profilePic = fromMe ? currentUser?.avatar : selectedConversation?.avatar

  return (
    <>
      {!fromMe ? (
        <div className='message sender mb-4 flex'>
          <div className='flex-2'>
            <div className='w-12 h-12 relative'>
              <Avatar>
                <AvatarImage src={profilePic} />
                <AvatarFallback></AvatarFallback>
              </Avatar>
            </div>
          </div>
          <div className=' px-2'>
            <div className='inline-block bg-secondary rounded-full p-2 px-6 text-primary'>
              <span>{message?.message}</span>
            </div>
            <div className='pl-4'>
              <small className='text-gray-500'>{formatTime}</small>
            </div>
          </div>
        </div>
      ) : (
        <div className='message current-user mb-4 flex text-right'>
          <div className='flex-1 px-2'>
            <div className='inline-block bg-secondary-foreground rounded-full p-2 px-6 text-secondary'>
              <span>{message.message}</span>
            </div>
            <div className='pr-4'>
              <small className='text-gray-500'>{formatTime}</small>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Message
