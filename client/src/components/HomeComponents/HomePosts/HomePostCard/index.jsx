import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { Share, Heart, MessageCircle, Bookmark } from 'lucide-react'
import ReactPlayer from 'react-player'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import PostDialog from '@/components/Common/PostDialog'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { UploadContext } from '@/context/UploadContext'
import { useGetPost } from '@/hooks/PostHooks'
import useStore from '@/hooks/use-store'

const HomePostCard = ({
  post,
  isLastPost,
  onIntersect,
  activeVideo,
  isPlaying,
  setIsPlaying,
  swiperRef,
  handlePlay,
  handlePause,
  params
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const variantCard = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  }

  // const { openDialog, isOpenDialog } = useOpenDialog()

  // const { handleOpen, openDialog } = useContext(UploadContext)
  const { postId, setPostId, openDialog, setOpenDialog } = useStore()

  const handleOpenPost = id => {
    setPostId(id)
    setOpenDialog(true)
  }

  // В вашем PostDialog

  // const [Id, setId] = useState(null)
  // const [shouldOpen, setShouldOpen] = useState(false)
  // const { data: postData, isLoading } = useGetPost(Id)

  // useEffect(() => {
  //   if (postData && !isLoading && shouldOpen) {
  //     handleOpen()
  //   }
  // }, [postData, isLoading, shouldOpen])

  // const handleOpenPost = postId => {
  //   setId(postId)
  //   setShouldOpen(true)
  // }

  return (
    <motion.div
      ref={isLastPost ? onIntersect : null}
      variants={variantCard}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.5 }}>
      <Card key={post?._id} ref={isLastPost ? onIntersect : null} className=''>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={post?.user?.avatar} />
            </Avatar>
            <div className='flex gap-2'>
              <span>{post?.user?.username}</span>
              <span>
                <Button variant={'link'} className={'w-0 h-0'}>
                  Follow
                </Button>
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {post.media.length === 1 ? (
            <>
              {post.media[0].type === 'Video' ? (
                <AspectRatio ratio={1 / 1}>
                  <ReactPlayer
                    className='customVideo'
                    controls={true}
                    loop={true}
                    width='100%'
                    onPlay={() =>
                      setIsPlaying({
                        ...isPlaying,
                        [post.media[0]?._id]: true
                      })
                    }
                    onPause={() =>
                      setIsPlaying({
                        ...isPlaying,
                        [post.media[0]?._id]: false
                      })
                    }
                    onEnded={() =>
                      setIsPlaying({
                        ...isPlaying,
                        [post.media[0]?._id]: false
                      })
                    }
                    height='100%'
                    playing={isPlaying[post.media[0]?._id]}
                    url={post.media[0]?.url}
                  />
                </AspectRatio>
              ) : (
                <AspectRatio ratio={1 / 1}>
                  <LazyLoadImage
                    onLoad={() => setIsLoaded(true)}
                    src={post.media[0]?.url}
                    className={`w-full h-full object-cover ${
                      isLoaded ? 'loaded' : 'loading'
                    }`}
                    alt={post.media[0]?.type}
                  />
                </AspectRatio>
              )}
            </>
          ) : (
            <Swiper
              ref={swiperRef}
              {...params}
              slidesPerView={1}
              navigation={true}
              centeredSlides={true}
              pagination={{
                clickable: true
              }}
              modules={[Pagination, Navigation]}
              className='mySwiper'>
              {post?.media.map((media, mediaIndex) => (
                <SwiperSlide key={media?._id}>
                  {media?.type === 'Video' ? (
                    <AspectRatio ratio={1 / 1}>
                      <ReactPlayer
                        className='customVideo'
                        controls={true}
                        loop={true}
                        width='100%'
                        onPlay={handlePlay}
                        onPause={handlePause}
                        onEnded={handlePause}
                        height='100%'
                        playing={activeVideo === media?._id}
                        url={media?.url}
                      />
                    </AspectRatio>
                  ) : (
                    <AspectRatio ratio={1 / 1}>
                      <LazyLoadImage
                        src={media?.url}
                        onLoad={() => setIsLoaded(true)}
                        className={`w-full h-full object-cover ${
                          isLoaded ? 'loaded' : 'loading'
                        }`}
                        alt={media?.type}
                      />
                    </AspectRatio>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </CardContent>
        <CardFooter>
          <div className='flex flex-col justify-center  w-full'>
            <div className='flex justify-between items-center '>
              <ul className='flex items-center gap-2'>
                <li className='cursor-pointer'>
                  <span>
                    <Heart />
                  </span>
                </li>
                <li
                  onClick={() => handleOpenPost(post?._id)}
                  className='cursor-pointer'>
                  <span>
                    <MessageCircle />
                  </span>
                </li>
                <li className='cursor-pointer'>
                  <span>
                    <Share />
                  </span>
                </li>
              </ul>
              <span className='cursor-pointer'>
                <Bookmark />
              </span>
            </div>
            <div className='flex flex-col justify-start pl-1 items-start mt-2 font-semibold'>
              <div className=' cursor-pointer'>{post?.likes.length} likes</div>
              <ul className='flex flex-col'>
                <li>{post?.user?.username}</li>
                <li>{post?.content}</li>
              </ul>
            </div>
          </div>
        </CardFooter>
      </Card>
      <PostDialog postId={postId} openDialog={openDialog} />
    </motion.div>
  )
}

export default HomePostCard
