import React, { useState } from 'react'
import { Bell } from 'lucide-react'
import { MessageSquareMore } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useGetMe, useGetSearchHistory } from '@/hooks/UsersHooks'
import SearchUsers from '../SearchUsers'
import Logo from '@/assets/share-2.png'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { ModeToggle } from '@/components/Common/mode-toggle'
import Hamburger from 'hamburger-react'
import UserDropdown from '../UserDropdown'
import { Link } from 'react-router-dom'

const MainNav = () => {
  const { data: currentUser, isLoading, isError, isSuccess } = useGetMe()
  const [isOpen, setOpen] = useState(false)

  const fallBack =
    currentUser?.firstName?.charAt(0) + currentUser?.lastName?.charAt(0)
  return (
    <nav
      id='main-nav'
      className='fixed z-50 top-0 w-full bg-secondary border shadow-lg py-4'>
      <div className='wrapper px-4 md:px-6 lg:px-8 xl:px-10'>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-x-3'>
            {/* <span className='md:hidden block'>
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </span> */}
            <Link className='flex ' to={'/'}>
              <div className=' items-center flex'>
                <div className='w-[50px]  bg-primary bg-white border-primary border p-2 rounded-md '>
                  <LazyLoadImage
                    className='w-full'
                    alt='WeShareLogo'
                    src={Logo}
                  />
                </div>
                <h3 className='text-primary pl-3 text-xl font-bold'>WeShare</h3>
              </div>
            </Link>
          </div>
          <SearchUsers />
          <ul className='flex items-center'>
            <div className='flex items-center mr-3 lg:mr-6'>
              <span className='p-2 inline-block cursor-pointer rounded-md'>
                <Bell size={24} />
              </span>
              {/* <span className='cursor-pointer'>
                <MessageSquareMore size={24} />
              </span> */}
              <span>
                <ModeToggle />
              </span>
            </div>
            <span className='cursor-pointer ml-1 lg:ml-4'>
              <UserDropdown />
            </span>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default MainNav
