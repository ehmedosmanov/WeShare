import React, { useEffect } from 'react'
import ChatSidebar from '../ChatSidebar'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import useConversation from '@/hooks/use-conversation'
import NoOneInChat from '../NoOneInChat'
import MessageInput from '../MessageInput'
import Messages from '../AllMessages'
import { AvatarFallback } from '@radix-ui/react-avatar'
import './index.scss'

const ChatMain = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()

  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])
  const fallBack =
    selectedConversation?.firstName?.charAt(0) +
    selectedConversation?.lastName?.charAt(0)
  return (
    <section className='h-full'>
      {!selectedConversation ? (
        <NoOneInChat />
      ) : (
        <>
          <header className='border-y b left-2  sticky top-[84px] z-10 mb-4 bg-background  py-1 px-4 md:px-8 w-full'>
            <div className='flex items-center py-4 gap-x-2'>
              <Avatar>
                <AvatarImage src={selectedConversation?.avatar} />
                <AvatarFallback>{fallBack.toString()}</AvatarFallback>
              </Avatar>
              <h4 className=' font-bold'>{selectedConversation?.username}</h4>
            </div>
          </header>
          <div className='chat px-4 mt-3'>
            <div className='chat-area justify-between h-[75vh] flex flex-col'>
              <Messages />
              <MessageInput />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

export default ChatMain
