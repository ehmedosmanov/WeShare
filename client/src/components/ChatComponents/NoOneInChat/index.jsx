import { useGetMe } from '@/hooks/UsersHooks'
import React from 'react'

const NoOneInChat = () => {
  const { data: user } = useGetMe()
  return (
    <>
      <div className='flex items-center justify-center w-full h-full'>
        <div className='px-4 text-center sm:text-lg md:text-xl text-black dark:text-primary font-semibold flex flex-col items-center gap-2 h-[75vh] justify-center'>
          <p className='font-bold text-lg'>Welcome 👋 {user?.username} ❄</p>
          <p>Select a chat to start messaging</p>
        </div>
      </div>
    </>
  )
}

export default NoOneInChat
