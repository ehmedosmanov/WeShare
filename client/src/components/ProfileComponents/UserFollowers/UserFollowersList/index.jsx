import { Avatar } from '@/components/ui/avatar'
import {
  useFollowUser,
  useGetMe,
  useRemoveFromFollower
} from '@/hooks/UsersHooks'
import { AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'
import UnFollowBtn from '@/components/Common/UnFollowBtn'
import FollowBtn from '@/components/Common/FollowBtn'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const UserFollowersList = ({ users, query, viewId }) => {
  const { data: currentUser } = useGetMe()
  const { mutate: follow, isPending: followPending } = useFollowUser()
  const { mutate: removeFollower } = useRemoveFromFollower()

  //Eger bu oz profilidise ondaa Remove olacaq orda hemise
  const handleRemove = id => {
    removeFollower(id)
  }

  return (
    <>
      {users
        .filter(x =>
          x.username.trim().toLowerCase().includes(query.trim().toLowerCase())
        )
        .map(user => (
          <div
            key={user._id}
            className='p-2 rounded hover:bg-accent flex justify-between items-center'>
            <div className='flex gap-2 items-center'>
              <Avatar>
                <AvatarImage src={user?.avatar} />
              </Avatar>
              <div className='flex items-center ml-1'>
                <div className='flex items-center'>
                  <Link
                    to={`/profile/${user._id}`}
                    onClick={() => {
                      setOpen(false)
                    }}>
                    {user?.username}
                  </Link>
                  {currentUser?._id === viewId &&
                  !currentUser?.following.some(x => x._id === user._id) ? (
                    <Button
                      disabled={followPending}
                      onClick={() =>
                        follow({
                          id: user?._id
                        })
                      }
                      className='p-0 pl-2 text-[11px] mb-2 pr-3 text-secondary-foreground/80'
                      variant={'link'}>
                      Follow
                    </Button>
                  ) : null}
                </div>
              </div>
            </div>
            <div className=''>
              {currentUser?._id === viewId ? (
                <Button
                  variant={'destructive'}
                  onClick={() => handleRemove(user?._id)}>
                  Remove
                </Button>
              ) : currentUser?._id === user?._id &&
                currentUser?._id !== viewId ? null : currentUser.following.some(
                  x => x._id === user._id
                ) ? (
                <UnFollowBtn id={user._id} />
              ) : (
                <FollowBtn id={user._id} />
              )}
            </div>
          </div>
        ))}
    </>
  )
}

export default UserFollowersList
