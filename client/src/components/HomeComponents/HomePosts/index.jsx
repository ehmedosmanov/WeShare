import { useGetFollowingsPosts } from '@/hooks/PostHooks'
import React, { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { motion, useAnimation } from 'framer-motion'
import { MoonLoader } from 'react-spinners'
import HomePostCard from './HomePostCard'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const HomePosts = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetFollowingsPosts()
  const [activeVideo, setActiveVideo] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [shouldFetch, setshouldFetch] = useState(false)
  
  
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  useEffect(() => {
        setshouldFetch(true)      
  }, [])

  const controls = useAnimation()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  useEffect(() => {
    if (shouldFetch && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
      setshouldFetch(false)
    }
  }, [shouldFetch, hasNextPage, fetchNextPage, isFetchingNextPage])

  const swiperRef = useRef(null)

  const handlePlay = () => {
    setIsPlaying(true)
    if (swiperRef.current) {
      swiperRef.current.swiper.allowSlideNext = false
      swiperRef.current.swiper.allowSlidePrev = false
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
    if (swiperRef.current) {
      swiperRef.current.swiper.allowSlideNext = true
      swiperRef.current.swiper.allowSlidePrev = true
    }
  }

  const params = {
    onSlideChange: slide => {
      setActiveVideo(slide.activeIndex)
    }
  }

  console.log(data)
  return (
    <section id='posts' className='max-w-[580px] my-0 mx-auto'>
      <div className='wrapper'>
        <div className='post flex flex-col gap-8'>
          {data &&
            data.pages.map((page, pageIndex) =>
              page.posts.map((post, postIndex) => (
                <HomePostCard
                  isLoading={isLoading}
                  key={post?._id}
                  post={post}
                  idPost={post?._id}
                  isLastPost={
                    pageIndex === data.pages.length - 1 &&
                    postIndex === page.posts.length - 1
                  }
                  activeVideo={activeVideo}
                  isPlaying={isPlaying}
                  setIsPlaying={setIsPlaying}
                  swiperRef={swiperRef}
                  handlePlay={handlePlay}
                  handlePause={handlePause}
                  params={params}
                  onIntersect={ref}
                />
              ))
            )}
          <div className='w-full flex justify-center items-center'>
            {isFetchingNextPage && <MoonLoader size={25} color='#fff' />}
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomePosts
