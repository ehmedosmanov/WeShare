import React, { useContext, useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Home, Compass } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import CreatePostDialog from '@/components/NavbarComponents/CreatePostDialog'
import { UploadContext } from '@/context/UploadContext'

const ProfileNav = () => {
  const location = useLocation()
  const data = useContext(UploadContext)

  console.log(data)

  return (
    <nav id='side-nav' className=''>
      <ul className='flex  flex-col gap-y-6'>
        <Link>
          <li
            to={'/'}
            className={cn(
              'flex justify-center lg:justify-start items-center gap-x-4 bg-primary-foreground/60 hover:bg-accent dark:hover:bg-primary-foreground/100 duration-300 py-3 px-3 border-2 shadow-sm cursor-pointer rounded-lg text-black dark:text-white',
              location.pathname === '/'
                ? 'border-2 shadow-sm  dark:bg-primary dark:hover:text-black hover:bg-primary/80 hover:text-white bg-primary text-white dark:text-black   dark:hover:bg-primary/80'
                : null
            )}>
            <span>
              <Home />
            </span>
            <h2 className='lg:inline hidden'>Home</h2>
          </li>
        </Link>
        <Link to={'/feed'}>
          <li
            className={cn(
              'flex justify-center lg:justify-start items-center gap-x-4 bg-primary-foreground/60 hover:bg-accent dark:hover:bg-primary-foreground/100 duration-300 py-3 px-3 border-2 shadow-sm cursor-pointer rounded-lg text-black dark:text-white',
              location.pathname === '/feed'
                ? 'border-2 shadow-sm  dark:bg-primary dark:hover:text-black hover:bg-primary/80 hover:text-white bg-primary text-white dark:text-black   dark:hover:bg-primary/80'
                : null
            )}>
            <span>
              <Compass />
            </span>
            <h2 className='lg:inline hidden'>Feed</h2>
          </li>
        </Link>
        <CreatePostDialog {...data} />
      </ul>
    </nav>
  )
}

export default ProfileNav
