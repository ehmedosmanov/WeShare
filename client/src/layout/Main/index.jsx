import React, { Suspense } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer'
import MainNav from '@/components/NavbarComponents/MainNav'
import ProfileSidebar from '@/components/ProfileSidebar'
import MobileNav from '@/components/NavbarComponents/MobileNav'
import { cn } from '@/lib/utils'
import ChatSidebar from '@/components/ChatComponents/ChatSidebar'

const MainLayout = () => {
  const location = useLocation()
  return (
    <>
      <MainNav />
      <div className='flex h-full'>
        <ProfileSidebar />
        <main className='w-full duration-300 md:pl-24 lg:pl-[280px] flex-1 pt-[85px]'>
          {/* {location.pathname === '/chat' ? <ChatSidebar /> : null} */}
          <div
            className={cn(
              'wrapper main__inner',
              location.pathname === '/' ? '!max-w-full ' : null,
              location.pathname === '/feed' ? '!p-0 !max-w-[100%] !m-0' : '',
              location.pathname === '/chat' ? '!p-0 !max-w-[100%] !m-0' : ''
            )}>
            <Outlet />
          </div>
        </main>
        <MobileNav />
        {/* <div className=' w-72 overflow-auto h-screen bg-secondary col-span-2'></div> */}
      </div>
    </>
  )
}

export default MainLayout
