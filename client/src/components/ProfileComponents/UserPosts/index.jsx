import { AspectRatio } from '@/components/ui/aspect-ratio'
import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const UserPosts = () => {
  return (
    <section>
      <div className='divider h-[2px] mt-12 w-12/12 bg-primary-foreground/90'></div>
      <div className='posts'>
        <div className='heading flex justify-start py-6'>
          <h3 className='text-3xl font-bold text-primary'>Posts</h3>
        </div>
        <div className='posts py-4 gap-1 grid grid-cols-2 md:grid-cols-3'>
          <div className='post cursor-pointer  bg-black'>
            <AspectRatio ratio={1 / 1}>
              <LazyLoadImage
                className='w-full h-full object-cover'
                src='https://demo.foxthemes.net/socialite-v3.0/assets/images/post/img-2.jpg'
              />
            </AspectRatio>
          </div>
          <div className='post cursor-pointer  bg-black'>
            <AspectRatio ratio={1 / 1}>
              <LazyLoadImage
                className='w-full h-full object-cover'
                src='https://demo.foxthemes.net/socialite-v3.0/assets/images/post/img-2.jpg'
              />
            </AspectRatio>
          </div>
          <div className='post cursor-pointer  bg-black'>
            <AspectRatio ratio={1 / 1}>
              <LazyLoadImage
                className='w-full h-full object-cover'
                src='https://demo.foxthemes.net/instello/assets/images/post/post-2.jpg'
              />
            </AspectRatio>
          </div>
          <div className='post cursor-pointer  bg-black'>
            <LazyLoadImage
              className='w-full h-full object-cover'
              src='https://demo.foxthemes.net/instello/assets/images/post/post-2.jpg'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserPosts
