import { useGetUserFollowings } from '@/hooks/UsersHooks'
import { useGetMe } from '@/hooks/UsersHooks'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList
} from '@/components/ui/Command'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useParams } from 'react-router-dom'
import React from 'react'
import { useToggleFollowings } from '@/hooks/use-toggle-followers'
import FollowBtn from '@/components/Common/FollowBtn'
import UnFollowBtn from '@/components/Common/UnFollowBtn'

const UserFollowings = () => {
  const { id } = useParams()
  const { data: currentUser } = useGetMe()
  const { data: userFollowings, isLoading } = useGetUserFollowings(id)
  const [query, setQuery] = useState('')
  const { toggle, setToggle } = useToggleFollowings()

  // useEffect(() => {
  //   if (query.trim()) {
  //     const filteredUsers = userFollowers?.filter(user =>
  //       user?.username.trim().toLowerCase().includes(query.trim().toLowerCase())
  //     )
  //     setSearchedUsers(filteredUsers)
  //   } else {
  //     setSearchedUsers([])
  //   }
  // }, [query])

  if (isLoading) return <h1>....Loadaing</h1>

  return (
    <>
      <CommandDialog open={toggle} onOpenChange={setToggle}>
        <CommandInput
          type='text'
          value={query}
          onValueChange={e => setQuery(e)}
          placeholder='Type a username...'
          className='focus-visible:ring-0 ring-white focus-visible:ring-white border-b border-b-accent'
        />
        <CommandList>
          {userFollowings.length > 0 ? (
            userFollowings
              .filter(x =>
                x.username
                  .trim()
                  .toLowerCase()
                  .includes(query.trim().toLowerCase())
              )
              .map(user => (
                <div
                  key={user.id}
                  className='p-2 rounded hover:bg-accent flex justify-between items-center'>
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
                    {currentUser?._id ===
                    user._id ? null : currentUser.following.some(
                        x => x._id === user._id
                      ) ? (
                      <UnFollowBtn id={user._id} />
                    ) : (
                      // <Button
                      //   variant={'secondary'}
                      //   className={'py-1 h-9 rounded-full'}>
                      //   Following
                      // </Button>
                      <FollowBtn id={user._id} />
                    )}
                  </div>
                </div>
              ))
          ) : (
            <CommandEmpty>Dont Have Followers.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default UserFollowings
