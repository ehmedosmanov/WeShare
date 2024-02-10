import React, { useEffect, useState } from 'react'
import NavItem, { NavItemSkeleton } from './NavItem'
import { Home, Compass, PlusCircle } from 'lucide-react'

const ProfileNav = () => {
  const [isLoading, setisLoading] = useState(true)
  const navLinks = [
    {
      title: 'Home',
      path: '/',
      icon: <Home />
    },
    {
      title: 'Feed',
      path: '/feed',
      icon: <Compass />
    },
    {
      title: 'Create',
      path: null,
      icon: <PlusCircle />
    }
  ]

  useEffect(() => {
    const timer = setTimeout(() => {
      setisLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <nav id='side-nav' className=''>
      <ul className='flex  flex-col gap-y-6'>
        {isLoading
          ? Array(navLinks.length)
              .fill(0)
              .map((_, i) => <NavItemSkeleton key={i} />)
          : navLinks && navLinks.map(navLink => <NavItem {...navLink} />)}
      </ul>
    </nav>
  )
}

export default ProfileNav
