import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Home, Search, Compass, PlusCircle } from 'lucide-react'
import useOpenSearch from '@/hooks/use-open-search'
import CreatePostDialog from '../CreatePostDialog'
import { UploadContext } from '@/context/UploadContext'
import { cn } from '@/lib/utils'
import { MessageSquareMore } from 'lucide-react'

const MobileNav = () => {
  const { open, setOpen } = useOpenSearch()
  const data = useContext(UploadContext)
  return (
    <nav className='md:hidden block bg-background h-16 border-t-2 shadow-md z-40 fixed w-full bottom-0'>
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
              <CreatePostDialog {...data} />
            </span>
          </li>
          <li>
            <Link>
              <span>
                <Compass />
              </span>
            </Link>
          </li>

          <Link to={'/chat'}>
            <span>
              <MessageSquareMore />
            </span>
            <h2
              className={cn(
                'lg:inline hidden duration-100',
                location.pathname === '/chat' ? 'invisible' : ''
              )}>
              Chat
            </h2>
          </Link>
        </ul>
      </div>
    </nav>
  )
}

export default MobileNav
