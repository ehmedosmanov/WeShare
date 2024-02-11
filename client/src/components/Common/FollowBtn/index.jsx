import { Button } from '@/components/ui/button'
import React from 'react'
import { UserRoundPlus } from 'lucide-react'
import { MoonLoader } from 'react-spinners'
import { useFollowUser } from '@/hooks/UsersHooks'
const FollowBtn = ({ id }) => {
  const { mutate: follow, isPending: followPending } = useFollowUser()
  return (
    <>
      <Button
        disabled={followPending}
        onClick={() =>
          follow({
            id: id
          })
        }
        className='text-white flex justify-center items-center px-4 md:px-8 bg-blue-700 hover:bg-blue-700/90 duration-300'>
        {followPending ? (
          <MoonLoader speedMultiplier={1} size={18} color='#fff' />
        ) : (
          <>
            <UserRoundPlus className='mr-0 md:mr-3' />
            <span className='md:inline hidden'>Follow</span>
          </>
        )}
      </Button>
    </>
  )
}

export default FollowBtn
