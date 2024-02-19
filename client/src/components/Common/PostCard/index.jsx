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
import {
  useAddLikeToPost,
  useGetFollowingsPosts,
  useGetPost
} from '@/hooks/PostHooks'
import useStore from '@/hooks/use-store'
import { useGetMe } from '@/hooks/UsersHooks'

const PostCard = ({ post, onIntersect, isLastPost }) => {
  const { postId, setPostId, openDialog, setOpenDialog } = useStore()
  const handleOpenPost = id => {
    setPostId(id)
    setOpenDialog(true)
  }

  return (
    <div
      className='cursor-pointer'
      onClick={() => handleOpenPost(post?._id)}
      ref={isLastPost ? onIntersect : null}>
      <AspectRatio ref={isLastPost ? onIntersect : null} ratio={1 / 1}>
        {post?.media.length === 1 ? (
          <>
            {post.media[0].type === 'Video' ? (
              <ReactPlayer
                className='customVideo'
                controls={false}
                muted={true}
                loop={false}
                url={post.media[0]?.url}
              />
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
      <PostDialog postId={postId} openDialog={openDialog} />
    </div>
  )
}

export default PostCard