import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import DashboardSidebar from '../DasboardSidebar'
import DashboardNavbar from '../DashboardNavbar'
import { useGetMe } from '@/hooks/UsersHooks'
import LoadingScreen from '@/components/Common/LoadingScreen'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
const AdminLayout = () => {
  const [open, setOpen] = useState(false)
  const { data: currentUser, isLoading } = useGetMe()

  if (isLoading) return <LoadingScreen />

  if (!(currentUser?.role === 'Admin' || currentUser?.role === 'superAdmin')) {
    toast.error('You dont have permission to access this page')
    return <Navigate to='/' replace />
  }
  return (
    <>
      <main className='grid grid-cols-12'>
        <div
          className={cn(
            `col-span-2 shnadow h-screen fixed top-0 left-0 lg:translate-x-0 lg:block lg:visible lg:opacity-100 -translate-x-full invisible z-40 opacity-0 px-12  duration-300 ${
              !open ? '!translate-x-0  !visible !opacity-100' : ''
            }`
          )}>
          Sidebar
          <DashboardSidebar open={open} setOpen={setOpen} />
        </div>
        <div className='col-span-10'>
          Navbar
          <DashboardNavbar open={open} setOpen={setOpen} />
          <div className=' mt-16  ml-[248px] w-full flex  justify-end'>
            <div className='px-8 w-full'>
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AdminLayout
