import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useGetMe, useGetUserFollowings } from '@/hooks/UsersHooks'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Conversations from '../Conversations'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useCreateGroupChat } from '@/hooks/GroupChatHooks'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { MoonLoader } from 'react-spinners'
const ChatSidebar = () => {
  const location = useLocation()
  const { data: currentUser } = useGetMe()
  const { data: users, isLoading } = useGetUserFollowings(currentUser?._id)

  if (isLoading)
    return (
      <span className='flex justify-center items-center h-full'>
        <MoonLoader size={28} />
      </span>
    )

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20  md:left-[79px] sidebar bg-background invisible opacity-0 border h-screen w-14 lg:w-72',
        location.pathname === '/chat' ? 'visible opacity-100' : null
      )}>
      <div className='flex h-full flex-col  mt-[83px]'>
        <div className='my-4 flex mx-2 ms-auto'></div>
        <ul className='w-full  overflow-y-auto'>
          <Conversations />
        </ul>
      </div>
    </aside>
  )
}
export default ChatSidebar
