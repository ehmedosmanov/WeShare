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
import { useGetUserSavedPosts } from '@/hooks/UsersHooks'
import PostCard from '@/components/Common/PostCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const UserSavedPosts = ({ id }) => {
  const { data, fetchNextPage, isLoading, hasNextPage, isFetchingNextPage } =
    useGetUserSavedPosts(id)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1
  })

  console.log('saved posts', data)

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage])

  return (
    <>
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
    </>
  )
}

export default UserSavedPosts
