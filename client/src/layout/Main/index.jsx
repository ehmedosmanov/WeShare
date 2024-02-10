import React, { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import MainNav from '@/components/NavbarComponents/MainNav'
import ProfileSidebar from '@/components/ProfileSidebar'
import MobileNav from '@/components/NavbarComponents/MobileNav'

const MainLayout = () => {
  return (
    <>
      <MainNav />
      <div className='flex h-full'>
        <ProfileSidebar />
        <main className='w-full duration-300 md:pl-24 lg:pl-[18rem] flex-1 pt-[120px]'>
          <div className='wrapper main__inner'>
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
