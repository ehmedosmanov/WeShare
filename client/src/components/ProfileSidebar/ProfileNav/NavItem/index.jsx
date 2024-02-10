import { cn } from '@/lib/utils'
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Skeleton } from '@/components/ui/skeleton'

const NavItem = ({ path, title, icon }) => {
  const location = useLocation()

  return (
    <>
      <li
        className={cn(
          'flex justify-center lg:justify-start items-center gap-x-4 bg-primary-foreground/60 hover:bg-accent dark:hover:bg-primary-foreground/100 duration-300 py-3 px-3 border-2 shadow-sm cursor-pointer rounded-lg text-black dark:text-white',
          location.pathname === path
            ? 'border-2 shadow-sm  dark:bg-primary dark:hover:text-black hover:bg-primary/80 hover:text-white bg-primary text-white dark:text-black   dark:hover:bg-primary/80'
            : null
        )}>
        <span>{icon}</span>
        {path ? (
          <Link className='lg:inline hidden' to={path}>
            {title}
          </Link>
        ) : (
          <button className='lg:inline hidden' to={path}>
            {title}
          </button>
        )}
      </li>
    </>
  )
}

export const NavItemSkeleton = () => {
  return (
    <li
      className={cn(
        'flex items-center gap-x-4 bg-primary-foreground/60 hover:bg-accent dark:hover:bg-primary-foreground/100 duration-300 py-3 px-3 border-2 shadow-sm cursor-pointer rounded-lg text-black dark:text-white'
      )}>
      <span>
        <Skeleton className={'w-6 h-6'} />
      </span>
      <Skeleton className={'w-24 h-3'} />
    </li>
  )
}

export default NavItem
