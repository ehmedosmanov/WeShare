import { useEffect, useRef } from 'react'
import { useGetMessages } from '@/hooks/ChatHooks'
import useConversation from '@/hooks/use-conversation'
import Message from '../Messaage'
import { useGetGroupMessages } from '@/hooks/GroupChatHooks'
import { MoonLoader } from 'react-spinners'
const Messages = () => {
  const { selectedConversation } = useConversation()
  const isGroup = selectedConversation?.isGroup

  const { data: groupMessages, isLoading: isGroupLoading } = isGroup
    ? useGetGroupMessages(selectedConversation?._id)
    : { data: null, isLoading: false }
  const { data: messages, isLoading } = !isGroup
    ? useGetMessages(selectedConversation?._id)
    : { data: null, isLoading: false }

  console.log('this is loading', messages)

  const lastMessage = useRef()

  useEffect(() => {
    setTimeout(() => {
      lastMessage.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }, [messages])

  if (isLoading || isGroupLoading)
    return (
      <span className='flex justify-center items-center h-full'>
        <MoonLoader size={28} />
      </span>
    )

  // const conversationMessages = isGroup ? groupMessages : messages

  return (
    <>
      <div className='messages h-full  overflow-auto'>
        {messages?.length > 0 &&
          messages.map(message => (
            <div ref={lastMessage} key={message?._id}>
              <Message message={message} />
            </div>
          ))}
      </div>
      {!isLoading && messages?.length === 0 && (
        <p className='text-center text-lg flex justify-center items-center font-bold'>
          Send a message to start the conversation
        </p>
      )}
    </>
  )
}

export default Messages
