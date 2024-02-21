import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useGetMe } from '@/hooks/UsersHooks'
import { cn } from '@/lib/utils'
import React from 'react'
import { useLocation } from 'react-router-dom'
import Conversations from '../Conversations'
const ChatSidebar = () => {
  const location = useLocation()

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20  md:left-[79px] sidebar bg-background invisible opacity-0 border h-screen w-14 lg:w-72',
        location.pathname === '/chat' ? 'visible opacity-100' : null
      )}>
      <div className='flex h-full  mt-[83px]'>
        <ul className='w-full  overflow-y-auto'>
          <Conversations />
        </ul>
      </div>
    </aside>
  )
}

export default ChatSidebar
