import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSendMessage } from '@/hooks/ChatHooks'
import useConversation from '@/hooks/use-conversation'
import React, { useState } from 'react'

const MessageInput = () => {
  const { selectedConversation } = useConversation()
  const [message, setMessage] = useState('')
  const { mutate, isPending } = useSendMessage()

  const handleSubmit = e => {
    if (!message) return
    mutate({
      message: message,
      id: selectedConversation?._id
    })
    setMessage('')
  }

  const handleKeyPress = e => {
    console.log(e.key === 'Enter')
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <div className='pt-16 pb-2 mb-[56px]'>
        <div className='write bg-background items-center shadow flex rounded-lg'>
          <div className='flex-3 flex content-center items-center text-center p-4 pr-0'>
            <span className='block text-center text-gray-400 hover:text-gray-800'></span>
          </div>
          <div className='flex-1'>
            <Input
              disabled={isPending}
              value={message}
              onChange={e => setMessage(e.target.value)}
              name='message'
              className='w-full block outline-none py-4 px-4 bg-background border'
              rows='1'
              placeholder='Type a message...'
              autofocus
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className='flex-2 w-32 p-2 flex content-center items-center'>
            <div className='flex-1 text-center'></div>
            <div className='flex-1 w-full'>
              <Button disabled={isPending} onClick={handleSubmit}>
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessageInput
