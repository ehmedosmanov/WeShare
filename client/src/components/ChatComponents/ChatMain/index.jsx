import React, { useEffect, useState } from 'react'
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
import { X } from 'lucide-react'
import './index.scss'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { useGetMe } from '@/hooks/UsersHooks'
import { Link } from 'react-router-dom'
import { AlertModal } from '@/components/ui/alert-modal'
import { useDeleteGroupChat } from '@/hooks/GroupChatHooks'

const ChatMain = () => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const { data: currentMe } = useGetMe()
  useEffect(() => {
    return () => setSelectedConversation(null)
  }, [setSelectedConversation])
  const fallBack =
    selectedConversation?.firstName?.charAt(0) +
    selectedConversation?.lastName?.charAt(0)

  const deleteGroup = useDeleteGroupChat(selectedConversation?._id)

  const onConfirm = async () => {
    setLoading(true)
    try {
      await deleteGroup.mutateAsync()
      setOpen(false)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  console.log(selectedConversation)
  return (
    <section className='h-full'>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      {!selectedConversation ? (
        <NoOneInChat />
      ) : (
        <>
          <header className='border-y b left-2  sticky top-[84px] z-10 mb-4 bg-background  py-1 px-4 md:px-8 w-full'>
            <div className='flex items-center py-4 gap-x-2'>
              <Avatar>
                <AvatarImage
                  src={
                    selectedConversation?.avatar ||
                    selectedConversation?.groupAvatar
                  }
                />
                <AvatarFallback>{fallBack.toString()}</AvatarFallback>
              </Avatar>
              <div className='flex flex-col'>
                <h4 className=' font-bold'>
                  {selectedConversation?.username ||
                    selectedConversation?.groupName}
                </h4>
                {selectedConversation?.isGroup ? (
                  <Dialog>
                    <DialogTrigger>
                      <div>
                        <span className='text-xs'>
                          {selectedConversation?.participants?.length} group
                          members
                        </span>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>Group Members</DialogHeader>
                      {selectedConversation.participants &&
                        selectedConversation?.participants.map(member => (
                          <div className='flex items-center gap-4'>
                            <Link to={`/profile/${member?._id}`}>
                              {member?.username}
                            </Link>
                          </div>
                        ))}
                    </DialogContent>
                  </Dialog>
                ) : null}
              </div>
              {selectedConversation?.isGroup &&
              selectedConversation.admin === currentMe?._id ? (
                <Button
                  onClick={() => setOpen(true)}
                  variant='link'
                  className='ms-auto'>
                  <X />
                </Button>
              ) : null}
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
