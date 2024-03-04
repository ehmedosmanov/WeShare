import { useEffect, useRef } from 'react'
import { useGetMessages } from '@/hooks/ChatHooks'
import useConversation from '@/hooks/use-conversation'
import Message from '../Messaage'
import { useGetGroupMessages } from '@/hooks/GroupChatHooks'

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

  if (isLoading || isGroupLoading) return <h1>...Loading</h1>

  const conversationMessages = isGroup ? groupMessages : messages

  return (
    <>
      <div className='messages h-full  overflow-auto'>
        {conversationMessages?.length > 0 &&
          conversationMessages.map(message => (
            <div ref={lastMessage} key={message?._id}>
              <Message message={message} />
            </div>
          ))}
      </div>
      {!isLoading && conversationMessages?.length === 0 && (
        <p className='text-center text-lg flex justify-center items-center font-bold'>
          Send a message to start the conversation
        </p>
      )}
    </>
  )
}

export default Messages
