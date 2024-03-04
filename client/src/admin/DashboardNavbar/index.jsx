import { Input } from '@/components/ui/input'
import React, { useContext } from 'react'
import { Search } from 'lucide-react'
import ProfileButton from './ProfileButton'

const DashboardNavbar = ({ open, setOpen }) => {
  return (
    <nav className='shadow fixed top-0 bg-background h-16 px-4 border border-primary-200 w-full'>
      <div className='navbar gap-6 flex items-center h-16'>
        <div
          onClick={() => setOpen(!open)}
          className='block lg:hidden ml-2 text-2xl cursor-pointer'></div>
        <div className='flex justify-end w-full items-center gap-2'>
          <div className=''>
            <ProfileButton />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default DashboardNavbar
