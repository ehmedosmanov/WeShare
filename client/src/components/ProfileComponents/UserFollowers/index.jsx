import { useGetUserFollowers } from '@/hooks/UsersHooks'
import {
  useGetMe,
  useGetSearchHistory,
  useGetUsers,
  useSaveSearchHistory
} from '@/hooks/UsersHooks'
import { useState, useEffect } from 'react'
import { BadgeCheck, Lock, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList
} from '@/components/ui/Command'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useParams } from 'react-router-dom'
import React from 'react'
import { useToggleFollowers } from '@/hooks/use-toggle-followers'

const UserFollowers = () => {
  const { id } = useParams()
  const { data: currentUser } = useGetMe()
  const { data: userFollowers, isLoading } = useGetUserFollowers(id)
  const [searchedUsers, setSearchedUsers] = useState([])
  const [query, setQuery] = useState('')
  const { open, setOpen } = useToggleFollowers()
  const isCurrentProfile = currentUser?._id === id
  const isFollowing = currentUser?.following.some(x => x._id === id)

  useEffect(() => {
    if (query.trim()) {
      const filteredUsers = userFollowers?.filter(user =>
        user?.username.trim().toLowerCase().includes(query.trim().toLowerCase())
      )
      setSearchedUsers(filteredUsers)
    } else {
      setSearchedUsers([])
    }
  }, [query])

  if (isLoading) return <h1>....Loadaing</h1>

  console.log(userFollowers)

  console.log(userFollowers)

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          type='text'
          value={query}
          onValueChange={e => setQuery(e)}
          placeholder='Type a username...'
          className='focus-visible:ring-0 ring-white focus-visible:ring-white border-b border-b-accent'
        />
        <CommandList>
          {userFollowers ? (
            userFollowers.map(user => (
              <div
                key={user.id}
                className='mx-2 p-2 rounded hover:bg-accent flex justify-between items-center'>
                <div className='flex gap-2 items-center'>
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                  </Avatar>
                  <Link
                    className='flex items-center gap-x-2'
                    to={`/profile/${user._id}`}
                    onClick={() => {
                      setOpen(false)
                    }}>
                    {user.username}
                  </Link>
                </div>
                <div className=''>
                  <Button
                    variant={'default'}
                    className={'py-1 h-9 rounded-full'}>
                    Follow
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <CommandList>No searched User.</CommandList>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default UserFollowers
