import { AspectRatio } from '@/components/ui/aspect-ratio'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import { MoonLoader } from 'react-spinners'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import ReactPlayer from 'react-player'
import { useGetUserPosts } from '@/hooks/UsersHooks'
import PostCard from '@/components/Common/PostCard'
import PostSkeleton from './PostSkeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const UserPosts = ({ id }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetUserPosts(id)

  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage])

  console.log(data)

  return (
    <section>
      <Tabs defaultValue='posts'>
        <div className='divider h-[2px] mt-12 w-12/12 bg-primary-foreground/90'></div>
        <TabsList className='w-6/12 items-center justify-center mx-auto my-6 grid grid-cols-2'>
          <TabsTrigger value='posts'>Posts</TabsTrigger>
          <TabsTrigger value='saved'>Saved</TabsTrigger>
        </TabsList>
        <TabsContent value='posts'>
          <div className='posts'>
            <div className='heading flex justify-start py-6'>
              <h3 className='text-3xl font-bold text-primary'>Posts</h3>
            </div>
            <div className='posts py-4 gap-1 grid grid-cols-2 md:grid-cols-3'>
              {data &&
                data?.pages?.map((page, pageIndex) =>
                  page?.posts?.map((post, postIndex) => (
                    <PostCard
                      userId={id}
                      post={post}
                      key={post?._id}
                      isLastPost={
                        pageIndex === data.pages.length - 1 &&
                        postIndex === page.posts.length - 1
                      }
                      onIntersect={ref}
                    />
                  ))
                )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value='saved'>
          <div className='saved'>
            <div className='heading flex justify-start py-6'>
              <h3 className='text-3xl font-bold text-primary'>Saved Posts</h3>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default UserPosts

// {userPosts && userPosts.length === 0 ? (
//   <h2>User Dont Have any Post</h2>
// ) : (
//   userPosts?.posts.map(post => (
//     <AspectRatio key={post._id} ratio={1 / 1}>
//       {post.media.length === 1 ? (
//         <>
//           {post.media[0].type === 'Video' ? (
//             <ReactPlayer
//               className='customVideo'
//               controls={false}
//               muted={true}
//               loop={false}
//               url={post.media[0]?.url}
//             />
//           ) : (
//             <LazyLoadImage
//               src={post.media[0]?.url}
//               className={`w-full h-full object-cover`}
//               alt={post.media[0]?.type}
//             />
//           )}
//         </>
//       ) : (
//         <Swiper
//           slidesPerView={1}
//           navigation={true}
//           centeredSlides={true}
//           pagination={{
//             clickable: true
//           }}
//           modules={[Pagination, Navigation]}
//           className='mySwiper'>
//           {post?.media.map((media, mediaIndex) => (
//             <SwiperSlide key={media?._id}>
//               {media?.type === 'Video' ? (
//                 <AspectRatio ratio={1 / 1}>
//                   <ReactPlayer
//                     className='customVideo'
//                     controls={true}
//                     loop={true}
//                     width='100%'
//                     height='100%'
//                     url={media?.url}
//                   />
//                 </AspectRatio>
//               ) : (
//                 <AspectRatio ratio={1 / 1}>
//                   <LazyLoadImage
//                     src={media?.url}
//                     className={`w-full h-full object-cover`}
//                     alt={media?.type}
//                   />
//                 </AspectRatio>
//               )}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       )}
//     </AspectRatio>
//   ))
// )}
