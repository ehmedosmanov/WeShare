import React from 'react'
import ProfileCard, { ProfileCardSkeleton } from './ProfileCard'
import ProfileNav from './ProfileNav'
import { useGetMe } from '@/hooks/UsersHooks'
import { cn } from '@/lib/utils'
import { useLocation } from 'react-router-dom'

const ProfileSidebar = () => {
  const { isLoading } = useGetMe()
  const location = useLocation()
  return (
    <aside
      id='profile-sidebar'
      className={cn(
        'fixed top-0 left-0 md:w-20 duration-300  lg:w-72 hidden md:block  h-full border-r-2',
        location.pathname === '/chat' ? '!w-20 duration-300 transition' : ''
      )}>
      <div className='flex justify-center flex-col gap-y-12 px-3 h-full'>
        {/* {isLoading ? <ProfileCardSkeleton /> : <ProfileCard />} */}
        <ProfileNav />
      </div>
    </aside>
  )
}

export const ProfileSidebarSkeleton = () => {
  return (
    <aside
      id='profile-sidebar'
      className='fixed top-0 left-0 w-72  h-full border-r-2 pr-2'>
      <div className='flex flex-col gap-y-12 px-6 h-full scrollbar '>
        <ProfileCardSkeleton />
        <ProfileNav />
      </div>
    </aside>
  )
}

export default ProfileSidebar
