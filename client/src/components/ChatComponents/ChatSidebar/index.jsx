import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useGetMe, useGetUserFollowings } from '@/hooks/UsersHooks'
import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Conversations from '../Conversations'
import { Button } from '@/components/ui/button'
import { Users } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { useCreateGroupChat } from '@/hooks/GroupChatHooks'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'

const ChatSidebar = () => {
  const location = useLocation()
  const { data: currentUser } = useGetMe()
  const { data: users, isLoading } = useGetUserFollowings(currentUser?._id)
  const { mutateAsync, isPending } = useCreateGroupChat()
  const [groupUsers, setGroupUsers] = useState([])
  const [groupName, setGroupName] = useState('')
  const [groupAvatar, setGroupAvatar] = useState(null)

  console.log(groupUsers)
  console.log(groupName)
  console.log(groupAvatar)

  if (isLoading) return <h1>...Loading</h1>

  const handleSelectUser = (id, isChecked) => {
    console.log('salam id', id)
    if (id) {
      setGroupUsers(prevUser => {
        if (isChecked) {
          return [...prevUser, id]
        } else {
          return prevUser.filter(userId => userId !== id)
        }
      })
    }
  }

  const handleAvatar = avatar => {
    setGroupAvatar(avatar)
  }
  const handleGroupName = name => {
    setGroupName(name)
  }

  const handleSubmit = async e => {
    console.log('sa')
    try {
      e.preventDefault()
      const formData = new FormData()
      formData.append('groupName', groupName)
      groupUsers.forEach(userId => {
        console.log('for', userId)
        formData.append('participants', userId)
      })
      if (groupAvatar) {
        formData.append('groupAvatar', groupAvatar)
      }

      await mutateAsync(formData)
    } catch (error) {
      console.error('Error creating group:', error.message)
    }
  }

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20  md:left-[79px] sidebar bg-background invisible opacity-0 border h-screen w-14 lg:w-72',
        location.pathname === '/chat' ? 'visible opacity-100' : null
      )}>
      <div className='flex h-full flex-col  mt-[83px]'>
        <div className='my-4 flex mx-2 ms-auto'>
          <Dialog>
            <DialogTrigger asChild>
              <Users />
            </DialogTrigger>
            <DialogContent>
              <form
                className='flex flex-col gap-4'
                onSubmit={e => handleSubmit(e)}>
                <DialogHeader>
                  <DialogTitle className='font-semibold text-2xl'>
                    Create Group Chat
                  </DialogTitle>
                </DialogHeader>
                <div>
                  <h3 className='font-bold text-md mb-4'>Group Name:</h3>
                  <div>
                    <Input
                      disabled={isPending}
                      value={groupName}
                      onChange={e => handleGroupName(e.target.value)}
                      placeholder={'Group Name'}
                      className={
                        'focus-visible:ring-0 focus-visible:ring-none focus-visible:ring-offset-0 '
                      }
                    />
                  </div>
                </div>
                <div>
                  <h3 className='font-bold text-md mb-4'>Group Avatar:</h3>
                  <div>
                    <label class='block'>
                      <span class='sr-only'>Choose profile photo</span>
                      <input
                        disabled={isPending}
                        type='file'
                        onChange={e => handleAvatar(e.target.files[0])}
                        class='block w-full text-sm text-gray-500
      file:me-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-primary file:text-black
      hover:file:bg-primary
      file:disabled:opacity-50 file:disabled:pointer-events-none
      dark:file:bg-primary
      dark:hover:file:bg-primary
    '
                      />
                    </label>
                  </div>
                </div>
                <div className='grid gap-4'>
                  <h3 className='font-bold text-md'>Select Group Members:</h3>
                  <Separator />
                  {users &&
                    users.map(item => (
                      <div className='flex items-center justify-between mx-4'>
                        <div className='flex border-b border-b-black items-center gap-2'>
                          <Avatar>
                            <AvatarImage src={item?.avatar} />
                          </Avatar>
                          <Link to={`/profile/${item?._id}`}>
                            {item?.username}
                          </Link>
                        </div>
                        <input
                          type='checkbox'
                          onChange={e =>
                            handleSelectUser(item?._id, e.target.checked)
                          }
                        />
                      </div>
                    ))}
                  <Separator />
                </div>
                <DialogFooter></DialogFooter>
                <Button disabled={isPending} type='submit'>
                  Save changes
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <ul className='w-full  overflow-y-auto'>
          <Conversations />
        </ul>
      </div>
    </aside>
  )
}
export default ChatSidebar
