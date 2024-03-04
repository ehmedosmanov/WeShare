import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import LogoNav from '@/assets/share-2.png'
import { Code, UsersRound, Home, HelpCircle } from 'lucide-react'
export default function DashboardSidebar({ open, setOpen }) {
  return (
    <div className={cn('fixed flex left-0 top-0  z-50 shadow')}>
      <div
        className={cn(
          'flex flex-col h-screen p-3 bg-background border-r  w-60 transition-all duration-300'
        )}>
        <div className='space-y-3 pt-3'>
          <div className='flex mb-8 gap-2 items-center'>
            <div
              className={cn('w-3/12 object-contain bg-white p-2 rounded-lg')}>
              <img src={LogoNav} alt='' />
            </div>
            <span className=' absolute top-2 right-4 shadow w-6 border border-black text-center inline-flex justify-center lg:hidden  items-center h-6 rounded-sm'></span>
            <h2 className={cn('text-xl font-bold')}>WeShare</h2>
          </div>
          <div className='flex-1'>
            <ul className='pt-2 pb-4 space-y-4 text-sm'>
              <li
                className={cn(
                  'rounded-sm flex cursor-pointer duration-300 hover:bg-slate-100 hover:text-black'
                )}>
                <Link
                  to='/Admin'
                  className='flex items-center p-2 space-x-3 rounded-md'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='w-6 h-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2}>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
                    />
                  </svg>
                  <span>Home</span>
                </Link>
              </li>
              <li
                className={cn(
                  'rounded-sm flex duration-300 hover:bg-slate-100 hover:text-black'
                )}>
                <Link
                  to='/Admin/Users'
                  className='flex items-center p-2 space-x-3 rounded-md'>
                  <UsersRound />
                  <span>Users</span>
                </Link>
              </li>

              <li
                className={cn(
                  'rounded-sm flex duration-300 hover:bg-slate-100 hover:text-black'
                )}>
                <Link
                  to='/Settings'
                  className='flex items-center p-2 space-x-3 rounded-md'>
                  <HelpCircle />
                  <span>Settings</span>
                </Link>
              </li>
              <li
                className={cn(
                  'rounded-sm flex duration-300 hover:bg-slate-100 hover:text-black'
                )}>
                <Link
                  to='/'
                  className='flex items-center p-2 space-x-3 rounded-md'>
                  <Home />
                  <span>Back To Home</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
