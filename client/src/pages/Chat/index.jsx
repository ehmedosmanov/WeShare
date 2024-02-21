import ChatMain from '@/components/ChatComponents/ChatMain'
import ChatSidebar from '@/components/ChatComponents/ChatSidebar'
import React from 'react'
import { Helmet } from 'react-helmet-async'

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <div className='grid grid-cols-12  justify-center'>
        <div className=' col-span-1'>
          <ChatSidebar />
        </div>
        <div className='w-full col-span-11 px-3 md:px-0'>
          <ChatMain />
        </div>
      </div>
    </>
  )
}

export default Chat
