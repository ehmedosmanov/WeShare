import { useEffect, useRef } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useGetMessages } from '@/hooks/ChatHooks'
import useConversation from '@/hooks/use-conversation'
import { AvatarImage } from '@radix-ui/react-avatar'
import Message from '../Messaage'

const Messages = () => {
  // const fallBack =
  // currentUser?.firstName?.charAt(0) + currentUser?.lastName?.charAt(0)
  const { selectedConversation } = useConversation()

  console.log('this is not working', selectedConversation)

  const { data: messages, isLoading } = useGetMessages(
    selectedConversation?._id
  )

  const lastMessage = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [messages])

  if (isLoading) return <h1>...Loading</h1>

  console.log(selectedConversation)

  return (
    <>
      <div className='messages h-full  overflow-auto'>
        {messages.length > 0 &&
          messages.map(message => (
            <div ref={lastMessage} key={message?._id}>
              <Message message={message} />
            </div>
          ))}
      </div>
      {!isLoading && messages.length === 0 && (
        <p className='text-center text-lg flex justify-center items-center font-bold'>
          Send a message to start the conversation
        </p>
      )}
    </>
  )
}

export default Messages
