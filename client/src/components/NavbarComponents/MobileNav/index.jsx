import React from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, Compass, PlusCircle } from 'lucide-react'
import useOpenSearch from '@/hooks/use-open-search'
const MobileNav = () => {
  const { open, setOpen } = useOpenSearch()

  return (
    <nav className='md:hidden block bg-background h-16 border-t-2 shadow-md fixed w-full bottom-0'>
      <div className='mobile-navbar'>
        <ul className='flex justify-evenly items-center h-16'>
          <li>
            <Link>
              <span>
                <Home />
              </span>
            </Link>
          </li>
          <li>
            <span onClick={setOpen} className=' cursor-pointer'>
              <Search />
            </span>
          </li>
          <li>
            <span className=' cursor-pointer'>
              <PlusCircle />
            </span>
          </li>
          <li>
            <Link>
              <span>
                <Compass />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default MobileNav
