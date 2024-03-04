import React, { useState } from 'react'
import UserProfileSkeleton from './UserProfileSkeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useParams } from 'react-router-dom'
import {
  useGetMe,
  useGetUserProfile,
  useUpdateAvatar
} from '@/hooks/UsersHooks'
import { Button } from '@/components/ui/button'
import FollowBtn from '@/components/Common/FollowBtn'
import UnFollowBtn from '@/components/Common/UnFollowBtn'
import {
  useToggleFollowers,
  useToggleFollowings
} from '@/hooks/use-toggle-followers'
import UserFollowers from '../UserFollowers'
import UserFollowings from '../UserFollowings'
import useConversation from '@/hooks/use-conversation'
import { useNavigate } from 'react-router-dom'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const UserProfileHeading = ({ data: userProfile, isLoading, id }) => {
  // const { data: userProfile, isLoading } = useGetUserProfile(id)
  const { selectedConversation, setSelectedConversation } = useConversation()
  const navigate = useNavigate()
  const { data: currentUser } = useGetMe()
  const { setOpen } = useToggleFollowers()
  const { setToggle } = useToggleFollowings()
  const isFollowing = currentUser?.following.some(x => x._id === id)

  const isCurrentProfile = currentUser?._id === id

  if (isLoading) return <UserProfileSkeleton />

  const handleClick = profile => {
    navigate('/chat')
    setSelectedConversation(profile)
  }

  return (
    <section id='user-profile' className=''>
      <div className='profile-heading'>
        <div className='flex md:flex-row flex-col items-center  gap-x-16'>
          <div className='max-w-[140px]  cursor-pointer rounded-full'>
            <LazyLoadImage
              className='w-full rounded-full object-contain'
              alt={userProfile?.username}
              src={`${
                userProfile?.avatar
                  ? userProfile?.avatar
                  : 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg'
              }`}
            />
          </div>
          <div className='flex w-full max-w-[85%] lg:max-w-[65%] flex-col gap-y-8'>
            <div>
              <div className='flex justify-between md:flex-row flex-col gap-y-4'>
                <div className='flex md:mt-0 mt-2  flex-col md:items-start items-center'>
                  <h3 className='font-bold md:text-left text-center text-lg md:text-[24px]'>
                    {userProfile?.firstName} {userProfile?.lastName}
                  </h3>
                  <span className='pt-3'>@{userProfile?.username}</span>
                </div>
                <ul className='flex justify-center md:justify-start items-center gap-x-2 '>
                  <li>
                    {isCurrentProfile ? (
                      <Link to={`/settings`}>
                        <Button variant='secondary'>Account Settings</Button>
                      </Link>
                    ) : isFollowing ? (
                      <UnFollowBtn id={id} />
                    ) : (
                      <FollowBtn id={id} />
                    )}
                  </li>
                  <li>
                    {isCurrentProfile ? null : (
                      <Button
                        onClick={() => handleClick(userProfile)}
                        className='duration-300'>
                        Send Message
                      </Button>
                    )}
                  </li>
                </ul>
              </div>
              <p className='pt-2 lg:text-base md:text-sm text-xs md:text-left text-center'>
                {userProfile?.bio?.split('\n').map((item, key) => (
                  <React.Fragment key={key}>
                    {item}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
            <div className='flex  justify-between lg:items-center lg:flex-row flex-col  gap-y-6'>
              <ul className='flex gap-10 md:justify-start justify-center'>
                <li className='flex flex-col gap-y-2 font-bold items-center'>
                  <h4 className='md:text-base text-xs'>Posts</h4>
                  <span className=' text-2xl font-semibold'>
                    {userProfile?.posts.length}
                  </span>
                </li>
                <li className='flex flex-col gap-y-2 font-bold items-center'>
                  <h4
                    className='md:text-base text-xs cursor-pointer'
                    onClick={setOpen}>
                    Followers
                  </h4>
                  <span className=' text-2xl font-semibold'>
                    {userProfile?.followers.length}
                  </span>
                </li>
                <li className='flex flex-col gap-y-2 font-bold items-center'>
                  <h4
                    onClick={setToggle}
                    className='cursor-pointer md:text-base text-xs'>
                    Following
                  </h4>
                  <span className=' text-2xl font-semibold'>
                    {userProfile?.following.length}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <UserFollowers />
      <UserFollowings />
    </section>
  )
}

export default UserProfileHeading
