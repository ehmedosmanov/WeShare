import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useGetMe } from '@/hooks/UsersHooks'
import React, { useEffect } from 'react'
import Conversation from '../Сonversation'
import { useGetInbox } from '@/hooks/ChatHooks'
import useConversation from '@/hooks/use-conversation'

const Conversations = () => {
  //   const { data: userConversations } = useGetMe()
  const { selectedConversation } = useConversation()
  const { data: inbox, refetch } = useGetInbox()

  useEffect(() => {
    refetch()
  }, [selectedConversation])

  const compareByLastMessageTime = (a, b) => {
    const lastMessageTimeA = new Date(a.updatedAt)
    const lastMessageTimeB = new Date(b.updatedAt)

    if (lastMessageTimeA < lastMessageTimeB) {
      return 1
    }
    if (lastMessageTimeA > lastMessageTimeB) {
      return -1
    }
    return 0
  }

  return (
    <>
      <>
        {inbox && inbox?.length === 0 ? (
          <h1 className='text-lg font-bold w-full text-center h-3/6 flex justify-center items-center'>
            Your Inbox Empty
          </h1>
        ) : (
          inbox
            ?.sort(compareByLastMessageTime)
            .map((part, lastInd) => (
              <Conversation
                part={part}
                conversations={inbox}
                username={part?.username}
                avatar={part?.avatar}
              />
            ))
        )}
      </>
    </>
  )
}

export default Conversations
