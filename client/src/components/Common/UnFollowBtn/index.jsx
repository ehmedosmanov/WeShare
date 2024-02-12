import { useUnFollowUser } from '@/hooks/UsersHooks'
import { UserRoundX } from 'lucide-react'
import { MoonLoader } from 'react-spinners'
import React from 'react'
import { Button } from '@/components/ui/button'

const UnFollowBtn = ({ id }) => {
  const { mutate: unfollow, isPending: unfollowPending } = useUnFollowUser()

  return (
    <>
      <Button
        disabled={unfollowPending}
        onClick={() =>
          unfollow({
            id: id
          })
        }
        className='text-white flex justify-center items-center px-3 md:px-5 bg-primary/40 hover:bg-primary/30 duration-300'>
        {unfollowPending ? (
          <MoonLoader speedMultiplier={1} size={18} color='#fff' />
        ) : (
          <>
            <UserRoundX className='mr-0 md:mr-3' />
            <span className='md:inline hidden'>Unfollow</span>
          </>
        )}
      </Button>
    </>
  )
}

export default UnFollowBtn
