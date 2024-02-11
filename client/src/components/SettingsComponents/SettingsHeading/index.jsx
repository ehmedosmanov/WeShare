import { useGetMe } from '@/hooks/UsersHooks'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const SettingsHeading = () => {
  const { data: currentUser } = useGetMe()
  return (
    <section id='settings'>
      <div className='profile-heading'>
        <div className='flex md:flex-row flex-col items-center gap-x-10'>
          <div className='max-w-[140px] rounded-full'>
            <LazyLoadImage
              className='w-full rounded-full h-full object-contain'
              alt={currentUser?.username}
              src={currentUser?.avatar}
            />
          </div>
          <div className='flex w-full max-w-[85%] lg:max-w-[65%] flex-col gap-y-8'>
            <div>
              <div className='flex justify-between md:flex-row flex-col gap-y-4'>
                <div className='flex  md:mt-0 mt-2  flex-col md:items-start items-center'>
                  <h3 className=' font-bold md:text-left text-center text-lg md:text-2xl'>
                    {currentUser?.firstName} {currentUser?.lastName}
                  </h3>
                  <span>@{currentUser?.username}</span>
                </div>
              </div>
              <p className='pt-4 lg:text-base md:text-sm text-xs md:text-left text-center'></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SettingsHeading
