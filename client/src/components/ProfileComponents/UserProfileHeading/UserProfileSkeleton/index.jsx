import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'
import { UserRoundPlus, UserRoundX } from 'lucide-react'

const UserProfileSkeleton = () => {
  return (
    <>
      <section id='user-profile' className=''>
        <div className='profile-heading'>
          <div className='flex md:flex-row flex-col items-center gap-x-16'>
            <div className='max-w-[140px] rounded-full'>
              <Skeleton className={'h-36 rounded-full w-36'} />
            </div>
            <div className='flex w-full max-w-[85%] lg:max-w-[65%] flex-col gap-y-8'>
              <div>
                <div className='flex justify-between md:flex-row flex-col gap-y-4'>
                  <div className='flex md:mt-0 mt-2  flex-col md:items-start items-center'>
                    <h3 className=' font-bold md:text-left text-center text-lg md:text-2xl'>
                      <Skeleton className={'h-7 w-36'} />
                    </h3>
                  </div>
                  <ul className='flex justify-center md:justify-start items-center gap-x-2 '>
                    <li>
                      <Skeleton className={'w-20 h-10'} />
                      {/* <Button className='text-white flex justify-center items-center px-4 md:px-8 bg-blue-700 hover:bg-blue-700/90 duration-300'>
                        <UserRoundPlus className='mr-0 md:mr-3' />
                        <span className='md:inline hidden'>Follow</span>
                      </Button> */}
                    </li>
                    <li>
                      <Button className='duration-300'>Send Message</Button>
                    </li>
                  </ul>
                </div>
                <Skeleton className={'h-8 w-20'} />
              </div>
              <div className='flex  justify-between lg:items-center lg:flex-row flex-col  gap-y-6'>
                <ul className='flex gap-10 md:justify-start justify-center'>
                  <li className='flex flex-col gap-y-2 font-bold items-center'>
                    <h4 className='md:text-base text-xs'>Posts</h4>
                    <span className=' text-2xl font-semibold'>
                      <Skeleton className={'w-6 h-8'} />
                    </span>
                  </li>
                  <li className='flex flex-col gap-y-2 font-bold items-center'>
                    <h4 className='md:text-base text-xs'>Followers</h4>
                    <Skeleton className={'w-6 h-8'} />
                  </li>
                  <li className='flex flex-col gap-y-2 font-bold items-center'>
                    <h4 className='md:text-base text-xs'>Following</h4>
                    <Skeleton className={'w-6 h-8'} />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default UserProfileSkeleton
