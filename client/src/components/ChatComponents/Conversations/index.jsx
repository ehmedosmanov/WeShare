import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useGetMe } from '@/hooks/UsersHooks'
import React, { useEffect } from 'react'
import Conversation, { ConversationSkeleton } from '../Сonversation'
import { useGetInbox } from '@/hooks/ChatHooks'
import useConversation from '@/hooks/use-conversation'
import GroupConversation from '../GroupConversation'
import { useGetGroups } from '@/hooks/GroupChatHooks'

const Conversations = () => {
  const { selectedConversation } = useConversation()
  const { data: inbox, refetch, isLoading } = useGetInbox()
  const { data: grouos, refetch: reGroup } = useGetGroups()

  useEffect(() => {
    refetch()
  }, [selectedConversation])

  const compareByLastMessageTime = (a, b) => {
    const lastMessageTimeA = new Date(a?.updatedAt)
    const lastMessageTimeB = new Date(b?.updatedAt)

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
          <>
            <div className='mb-4'>
              {/* <h2 className='mb-2 px-3 hidden lg:block'>Groups</h2> */}
              {/* {grouos
                ?.filter(conversation => conversation?.isGroup)
                ?.sort(compareByLastMessageTime)
                .map((part, lastInd) => (
                  <GroupConversation
                    part={part}
                    conversations={grouos}
                    groupName={part?.groupName}
                    groupAvatar={part?.groupAvatar}
                  />
                ))} */}
            </div>
            <h2 className='mb-2 px-3 hidden lg:block'>Users</h2>
            {isLoading ? (
              <ConversationSkeleton />
            ) : (
              inbox
                ?.filter(conversation => !conversation?.isGroup)
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
        )}
      </>
    </>
  )
}

export default Conversations
