import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import ReactPlayer from 'react-player'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import PostDialog from '@/components/Common/PostDialog'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import useStore from '@/hooks/use-store'

const PostCard = React.memo(({ post, userId, onIntersect, isLastPost }) => {
  const { postId, setPostId, openDialog, setOpenDialog } = useStore()

  const handleOpenPost = id => {
    setPostId(id)
    setOpenDialog(true)
  }

  return (
    <div className='cursor-pointer' ref={isLastPost ? onIntersect : null}>
      <AspectRatio
        onClick={() => handleOpenPost(post?._id)}
        ref={isLastPost ? onIntersect : null}
        ratio={1 / 1}>
        {post?.media.length === 1 ? (
          <>
            {post.media[0].type === 'Video' ? (
              <div className='w-[100%] h-[100%]'>
                <ReactPlayer
                  className='w-0 h-0'
                  controls={false}
                  muted={true}
                  width={'100%'}
                  height={'100%'}
                  loop={false}
                  url={post.media[0]?.url}
                />
              </div>
            ) : (
              <LazyLoadImage
                src={post.media[0]?.url}
                className={`w-full h-full object-cover`}
                alt={post.media[0]?.type}
              />
            )}
          </>
        ) : (
          <Swiper
            slidesPerView={1}
            centeredSlides={true}
            pagination={{
              clickable: true
            }}
            modules={[Pagination]}
            className='mySwiper'>
            {post?.media.map((media, mediaIndex) => (
              <SwiperSlide key={media?._id}>
                {media?.type === 'Video' ? (
                  <AspectRatio ratio={1 / 1}>
                    <ReactPlayer
                      className='customVideo'
                      controls={true}
                      loop={true}
                      width='0'
                      height='100%'
                      url={media?.url}
                    />
                  </AspectRatio>
                ) : (
                  <AspectRatio ratio={1 / 1}>
                    <LazyLoadImage
                      src={media?.url}
                      className={`w-full h-full object-cover`}
                      alt={media?.type}
                    />
                  </AspectRatio>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </AspectRatio>
      <PostDialog userId={userId} postId={postId} />
    </div>
  )
})

export default PostCard
