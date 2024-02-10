import { Button } from '@/components/ui/button'
import { useFollowUser, useGetUserProfile } from '@/hooks/UsersHooks'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useParams } from 'react-router-dom'
import { UserRoundPlus } from 'lucide-react'

const UserProfileHeading = () => {
  const { id } = useParams()
  const { data: userProfile, isLoading } = useGetUserProfile(id)
  const { mutate } = useFollowUser()

  console.log(userProfile)

  if (isLoading) return <h1>...Loading</h1>
  return (
    <section id='user-profile' className=''>
      <div className='profile-heading'>
        <div className='flex md:flex-row flex-col items-center gap-x-16'>
          <div className='max-w-[140px] rounded-full'>
            <LazyLoadImage
              className='w-full rounded-full h-full object-contain'
              alt={userProfile?.username}
              src={userProfile?.avatar}
            />
          </div>
          <div className='flex max-w-[85%] lg:max-w-[65%] flex-col gap-y-8'>
            <div>
              <div className='flex justify-between md:flex-row flex-col gap-y-4'>
                <div className='flex md:mt-0 mt-2  flex-col md:items-start items-center'>
                  <h3 className=' font-bold md:text-left text-center text-lg md:text-2xl'>
                    {userProfile?.firstName} {userProfile?.lastName}
                  </h3>
                </div>
                <ul className='flex justify-center md:justify-start items-center gap-x-2 '>
                  <li>
                    <Button
                      onClick={() =>
                        mutate({
                          id: id
                        })
                      }
                      className='text-white flex justify-center items-center px-4 md:px-8 bg-blue-700 hover:bg-blue-700/90 duration-300'>
                      <UserRoundPlus className='mr-0 md:mr-3' />
                      <span className='md:inline hidden'>Follow</span>
                    </Button>
                  </li>
                  <li>
                    <Button className='duration-300'>Send Message</Button>
                  </li>
                </ul>
              </div>
              <p className='pt-4 lg:text-base md:text-sm text-xs md:text-left text-center'>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ad
                repellat, sunt, asperiores incidunt tempore obcaecati dolore,
                provident in iure sit facere! Tempora, sapiente blanditiis!
                Fugit!
              </p>
            </div>
            <div className='flex  justify-between lg:items-center lg:flex-row flex-col  gap-y-6'>
              <ul className='flex gap-10 md:justify-start justify-center'>
                <li className='flex flex-col gap-y-2 font-bold items-center'>
                  <h4 className='md:text-base text-xs'>Posts</h4>
                  <span className=' text-2xl font-semibold'>
                    {userProfile?.posts.length}
                  </span>
                </li>
                <li className='flex flex-col gap-y-2 font-bold items-center'>
                  <h4 className='md:text-base text-xs'>Followers</h4>
                  <span className=' text-2xl font-semibold'>
                    {userProfile?.followers.length}
                  </span>
                </li>
                <li className='flex flex-col gap-y-2 font-bold items-center'>
                  <h4 className='md:text-base text-xs'>Following</h4>
                  <span className=' text-2xl font-semibold'>
                    {userProfile?.following.length}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserProfileHeading
