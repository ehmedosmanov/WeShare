import React, { useState } from 'react'
import UserProfileSkeleton from './UserProfileSkeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Link, useParams } from 'react-router-dom'
import {
  useGetMe,
  useGetUserFollowers,
  useGetUserProfile
} from '@/hooks/UsersHooks'
import { Button } from '@/components/ui/button'
import FollowBtn from '@/components/Common/FollowBtn'
import UnFollowBtn from '@/components/Common/UnFollowBtn'
import { useToggleFollowers } from '@/hooks/use-toggle-followers'
import UserFollowers from '../UserFollowers'

const UserProfileHeading = () => {
  const { id } = useParams()
  const { data: userProfile, isLoading } = useGetUserProfile(id)
  const { data: currentUser } = useGetMe()
  const { open, setOpen } = useToggleFollowers()
  const isFollowing = currentUser?.following.some(x => x._id === id)

  const isCurrentProfile = currentUser?._id === id

  console.log(userProfile)

  if (isLoading) return <UserProfileSkeleton />

  return (
    <section id='user-profile' className=''>
      <div className='profile-heading'>
        <div className='flex md:flex-row flex-col items-center gap-x-16'>
          <div className='max-w-[140px] rounded-full'>
            <LazyLoadImage
              className='w-full rounded-full h-full object-contain'
              alt={userProfile?.username}
              src={userProfile?.avatar}
            />
          </div>
          <div className='flex w-full max-w-[85%] lg:max-w-[65%] flex-col gap-y-8'>
            <div>
              <div className='flex justify-between md:flex-row flex-col gap-y-4'>
                <div className='flex  md:mt-0 mt-2  flex-col md:items-start items-center'>
                  <h3 className=' font-bold md:text-left text-center text-lg md:text-2xl'>
                    {userProfile?.firstName} {userProfile?.lastName}
                  </h3>
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
                    <Button className='duration-300'>Send Message</Button>
                  </li>
                </ul>
              </div>
              <p className='pt-4 lg:text-base md:text-sm text-xs md:text-left text-center'>
                {userProfile?.bio}
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
                  <h4 className='md:text-base text-xs'>Following</h4>
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
    </section>
  )
}

export default UserProfileHeading
