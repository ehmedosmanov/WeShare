import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useSocketContext } from '@/context/SocketContext'
import { useGetInbox, useGetMessages } from '@/hooks/ChatHooks'
import useConversation from '@/hooks/use-conversation'
import { cn } from '@/lib/utils'
import React, { useEffect } from 'react'

const GroupConversation = ({ groupName, part, groupAvatar }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const { onlineUsers } = useSocketContext()
  const isSelected = selectedConversation?._id === part?._id

  const isOnline = onlineUsers.includes(part?._id)

  const handleClickConversation = user => {
    setSelectedConversation(user)
  }

  console.log('Group avatar', groupAvatar)

  return (
    <>
      <li
        onClick={() => handleClickConversation(part)}
        className={cn(
          'flex cursor-pointer items-center gap-x-3 px-2 border-y py-3',
          isSelected ? 'bg-background' : null
        )}>
        <div className='w-10 h-10 relative'>
          <Avatar>
            <AvatarImage src={groupAvatar} />
          </Avatar>

          {isOnline ? (
            <span className='absolute w-3 h-3 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
          ) : (
            <span className='absolute w-3 h-3 bg-gray-400 rounded-full right-0 bottom-0 border-2 border-white'></span>
          )}
        </div>
        <h4 className='text-md sm:block hidden font-bold'>{groupName}</h4>
      </li>
    </>
  )
}

export default GroupConversation
