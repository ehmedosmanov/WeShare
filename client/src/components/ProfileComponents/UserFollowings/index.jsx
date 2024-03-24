import { useGetUserFollowings } from '@/hooks/UsersHooks'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import React from 'react'
import { useToggleFollowings } from '@/hooks/use-toggle-followers'
import UserFollowingsList from './UserFollowingList'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList
} from '@/components/ui/command'

const UserFollowings = () => {
  const { id } = useParams()
  const { data: userFollowings } = useGetUserFollowings(id)
  const [query, setQuery] = useState('')
  const { toggle, setToggle } = useToggleFollowings()

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
          {userFollowings?.length > 0 ? (
            <UserFollowingsList
              viewId={id}
              users={userFollowings}
              query={query}
            />
          ) : (
            <CommandEmpty>Dont Have Followers.</CommandEmpty>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
export default UserFollowings
