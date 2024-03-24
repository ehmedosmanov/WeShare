import { useGetUserFollowers } from '@/hooks/UsersHooks'
import { useState } from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList
} from '@/components/ui/Command'
import { useParams } from 'react-router-dom'
import React from 'react'
import { useToggleFollowers } from '@/hooks/use-toggle-followers'
import UserFollowersList from './UserFollowersList'

const UserFollowers = () => {
  const { id } = useParams()
  const { data: userFollowers, isLoading } = useGetUserFollowers(id)
  const [query, setQuery] = useState('')
  const { open, setOpen } = useToggleFollowers()

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
          {userFollowers?.length > 0 ? (
            <UserFollowersList
              viewId={id}
              users={userFollowers}
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
export default UserFollowers
