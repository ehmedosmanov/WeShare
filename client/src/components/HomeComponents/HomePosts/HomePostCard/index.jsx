import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { Share, Heart, MessageCircle, Bookmark } from 'lucide-react'
import ReactPlayer from 'react-player'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import 'swiper/css'
import 'swiper/css/pagination'
import PostDialog from '@/components/Common/PostDialog'
import { motion } from 'framer-motion'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { IoMdHeart } from 'react-icons/io'

import {
  EmailIcon,
  EmailShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from 'react-share'
import {
  useAddLikeToPost,
  useGetFollowingsPosts,
  useGetLikesByPost,
  useGetPost
} from '@/hooks/PostHooks'
import useStore from '@/hooks/use-store'
import { useGetMe } from '@/hooks/UsersHooks'
import { AnimatedTooltip } from '@/components/ui/animated-tooltip'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import FollowBtn from '@/components/Common/FollowBtn'
import { Link } from 'react-router-dom'
import UnFollowBtn from '@/components/Common/UnFollowBtn'
import { api } from '@/services/api'
import { cn } from '@/lib/utils'
import { Modal } from '@/components/ui/modal'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { savePost } from '@/services/post-service'
import { FaBookmark } from 'react-icons/fa'
import { toast } from 'sonner'

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
  const { data: currentUser } = useGetMe()
  const [id, setId] = useState(null)
  const { data: currentUserId } = useGetMe()
  const [postLikes, setPostLikes] = useState(null)
  const { data: usersLikes, refetch, isLoading } = useGetLikesByPost(post._id)
  const { mutate, isSuccess } = useAddLikeToPost()
  const [postLike, setPostLike] = useState(null)
  const [clickedByMe, setClickedByMe] = useState(null)
  // const { data: likes, i } = useGetPost(post._id)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const queryClient = useQueryClient()
  // const { mutateAsync } = useMutation({
  //   mutationFn: savePost,
  //   mutationKey: ['save-post', post?._id],
  //   onMutate: async id => {
  //     await queryClient.invalidateQueries(['me'])
  //     await queryClient.invalidateQueries(['userSavedPosts', currentUser?._id])
  //     await queryClient.cancelQueries(['post', id])
  //     const previousPost = queryClient.getQueryData(['post', id])
  //     return { previousPost }
  //   },
  //   onError: (err, id, context) => {
  //     queryClient.setQueryData(['post', id], context.previousPost)
  //   },
  //   onSettled: (data, error, id) => {
  //     if (data) {
  //       queryClient.setQueryData(['post', id], data)
  //     }
  //   }
  // })

  const handleOpenPost = useCallback(
    id => {
      setPostId(id)
      setId(id)
      setOpenDialog(true)
    },
    [setPostId, setId, setOpenDialog]
  )


  const handleLike = async () => {
    setIsLiked(current => !current)
    try {
      const res = await api.post(
        '/like/like-post',
        { id: post?._id },
        {
          withCredentials: true
        }
      )
      if (!res.data) {
        throw new Error('No data received from server')
      }
      const likedPost = await api.get(`/post/get-post/${post?._id}`, {
        withCredentials: true
      })
      console.log(likedPost)
      const likedPostData = likedPost.data
      setPostLikes(likedPostData?.likes)
      refetch()
    } catch (error) {
      console.log(error)
      throw error
    }
  }

    const handleSave = async id => {
    setIsSaved(current => !current)
    try {
      const res = await api.post(
        '/like/save-post',
        { id: post?._id },
        {
          withCredentials: true
        }
      )
      toast.success('Save Success')
      if (!res.data) {
        throw new Error('No data received from server')
      }
      const savedPost = await api.get(`/post/get-post/${post?._id}`, {
        withCredentials: true
      });
      const savedPostData = savedPost.data;
      // Обновление списка сохраненных постов
      queryClient.setQueryData(['post', id], savedPostData);
      queryClient.invalidateQueries(['userSavedPosts', currentUser?._id]);
    } catch (error) {
      console.log(error)
      setIsSaved(current => !current); 
    }
  }

  // const handleSave = async id => {
  //   setIsSaved(current => !current)
  //   await mutateAsync(id, {
  //     onError: () => {
  //       setIsSaved(current => !current)
  //     },
  //     onSuccess: data => {
  //       const isPostSaved = data.savedPosts?.some(
  //         savedPostId => savedPostId === id
  //       )
  //       setIsSaved(isPostSaved)
  //     }
  //   })
  // }

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser?._id))
    setPostLike(post.likes.length)
  }, [])

  useEffect(() => {
    const isPostSaved = currentUser?.savedPosts?.some(
      savedPostId => savedPostId === post._id
    );
    setIsSaved(isPostSaved);
  }, [currentUser, post._id]);

  useEffect(() => {
    postLikes?.includes(currentUser?._id)
      ? setClickedByMe(true)
      : setClickedByMe(false)
  }, [postLikes])

  useEffect(() => {
    const likedPost = post?.likes?.find(x => x?._id === currentUser?._id)
    likedPost ? setClickedByMe(true) : setClickedByMe(false)
  }, [refetch, currentUser?._id])

  return (
    <motion.div
      ref={isLastPost ? onIntersect : null}
      variants={variantCard}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.5 }}>
      <Card key={post?._id} ref={isLastPost ? onIntersect : null} className=''>
        <Link to={`/profile/${post?.user?._id}`}>
          <CardHeader>
            <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={post?.user?.avatar} />
              </Avatar>
              <div className='flex gap-2'>
                <span>{post?.user?.username}</span>
              </div>
            </div>
          </CardHeader>
        </Link>
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
            <div className='flex justify-between flex-col items-start gap-y-4 '>
              <span className=' cursor-pointer'>
                <AnimatedTooltip items={usersLikes} />
              </span>

              <div className='flex items-center justify-between w-full'>
                <ul className='flex items-center gap-2'>
                  {/* <li className='flex flex-row items-center justify-center mb-10 w-full'>
                </li> */}
                  <li className='cursor-pointer' onClick={handleLike}>
                    <span className='rounded-full bg-red-500'>
                      {clickedByMe ? (
                        <IoMdHeart
                          className=' duration-300 transition-colors'
                          size={28}
                          fill='red'
                        />
                      ) : (
                        <Heart size={30} className={cn('rounded-full  p-1')} />
                      )}
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
                    <Dialog>
                      <DialogTrigger>
                        <span>
                          <Share />
                        </span>
                      </DialogTrigger>
                      <DialogContent className='flex justify-center'>
                        <WhatsappShareButton
                          url='https://we-share-nu.vercel.app/'
                          title={`${currentUser?.username} want Share Post with you!`}
                          bgStyle='#000'>
                          <WhatsappIcon size={32} round />
                        </WhatsappShareButton>
                        <EmailShareButton
                          url='https://we-share-nu.vercel.app/'
                          title={`${currentUser?.username} want Share Post with you!`}
                          bgStyle='#000'>
                          <EmailIcon size={32} round />
                        </EmailShareButton>
                      </DialogContent>
                    </Dialog>
                  </li>
                </ul>
                <span
                  onClick={() => handleSave(post?._id)}
                  className='cursor-pointer'>
                  {isSaved ? <FaBookmark size={24} /> : <Bookmark />}
                </span>
              </div>
            </div>
            <div className='flex flex-col justify-start pl-1 items-start mt-2 font-semibold'>
              <div className=' cursor-pointer'>
                {/* {postLike !== null ? postLike : 0} */}
                {console.log('poslikes', postLikes)}
                {postLikes === null ? post?.likes?.length : postLikes.length}
                <Dialog>
                  <DialogTrigger asChild>
                    <button className='ml-2'>Likes</button>
                  </DialogTrigger>
                  <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                      <DialogTitle>Liked Users</DialogTitle>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                      {usersLikes &&
                        usersLikes.map(item => (
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-2'>
                              <Avatar>
                                <AvatarImage src={item?.avatar} />
                              </Avatar>
                              <Link to={`/profile/${item?._id}`}>
                                {item?.username}
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <ul className='flex flex-col'>
                <li>{post?.user?.username}</li>
                <li>{post?.content}</li>
              </ul>
            </div>
          </div>
        </CardFooter>
      </Card>
      <PostDialog
        clickedByMe={clickedByMe}
        postId={postId}
        openDialog={openDialog}
      />
    </motion.div>
  )
}

export default HomePostCard
