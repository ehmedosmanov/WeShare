import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import ReactPlayer from 'react-player'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import 'swiper/css'
import 'swiper/css/pagination'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { MoonLoader } from 'react-spinners'
import {
  useAddCommentToPost,
  useAddLikeToPost,
  useGetLikesByPost,
  useGetPost,
  useGetPostComments
} from '@/hooks/PostHooks'
import useStore from '@/hooks/use-store'
import { PostDialogSkeleton } from './PostDialogSkeleton'
import { MessageCircleMore, Heart, X, Share, SmilePlus } from 'lucide-react'
import { Input } from '@/components/ui/input'
import moment from 'moment'
import { useFollowUser, useGetMe } from '@/hooks/UsersHooks'
import Comment from '../Comment'

const PostDialog = ({ postId }) => {
  const { data: postData, isLoading, isFetching } = useGetPost(postId)
  const { setOpenDialog, openDialog } = useStore()
  const [imageLoading, setImageLoading] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [togglePicker, setTogglePicker] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [username, setUsername] = useState('')
  const [parentId, setParentId] = useState(null)
  const { refetch } = useGetLikesByPost(postId)
  const { data: postComments, isLoading: commentsLoading } =
    useGetPostComments(postId)
  const { mutate: follow, isPending: followPending } = useFollowUser()

  const { data: currentUserId } = useGetMe()
  const { mutate, isPending } = useAddCommentToPost()
  const { mutate: addLike } = useAddLikeToPost()

  const handleReadMoreClick = () => {
    setIsExpanded(true)
  }

  const handleLike = id => {
    console.log(`Like ${id}`)
    addLike({
      id: id
    })
    refetch()
  }
  if (isLoading || commentsLoading) return <PostDialogSkeleton />

  if (!openDialog) return null

  const handleInputChange = e => {
    setCommentText(e.target.value)
  }

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return
    console.log(`Parent ${parentId}`)
    console.log(`Comment ${commentText}`)
    mutate({
      postId: postId,
      content: commentText,
      parentId: parentId
    })
    setCommentText('')
    setParentId(null)
  }

  const replyHandle = (username, commentId) => {
    setUsername(`@${username}`)
    setCommentText(`@${username}`)
    setParentId(commentId)
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommentSubmit()
    }
  }

  return (
    <div className='relative'>
      <div
        className={` max-h-full overflow-y-auto lg:overflow-y-hidden lg:min-h-[93%]  border dialog fixed left-[50%] top-[50%] z-[51]  w-full translate-x-[-50%] translate-y-[-50%] grid overflow-hidden grid-cols-1 md:grid-cols-2  rounded-2xl border-none bg-background shadow-lg duration-200 ${
          openDialog
            ? 'opacity-100 no-scrollbar visible '
            : 'opaacity-0 invisible'
        } sm:rounded-lg  max-w-[300px] sm:max-w-[400px] md:max-w-[660px] lg:max-w-[770px]`}>
        <div className=' w-full h-full overflow-hidden'>
          {postData?.media?.length === 1 ? (
            <>
              {postData?.media[0].type === 'Video' ? (
                <ReactPlayer
                  className='customVideo'
                  controls={true}
                  loop={true}
                  width='100%'
                  height='100%'
                  url={postData?.media[0].url}
                />
              ) : (
                <LazyLoadImage
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                  src={postData?.media[0].url}
                  className={`w-full h-full  object-cover`}
                  alt={postData?.media[0].type}
                />
              )}
              {imageLoading && <PostDialogSkeleton />}
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
              {postData?.media?.map((media, mediaIndex) => (
                <SwiperSlide key={media?._id}>
                  {media?.type === 'Video' ? (
                    <div className='h-full w-full'>
                      <ReactPlayer
                        className='customVideo'
                        controls={true}
                        loop={true}
                        width='100%'
                        height='100%'
                        url={media?.url}
                      />
                    </div>
                  ) : (
                    <div>
                      <LazyLoadImage
                        src={media?.url}
                        className={`w-full h-full  object-cover`}
                        alt={media?.type}
                      />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
        <div className='dialog-content h-full pb-28 relative top-0 overflow-hidden py-4 px-2 w-full border'>
          <div className='dialog-header border-b w-full pb-3 border-muted'>
            <div className='flex items-center gap-3 ml-2'>
              <Avatar>
                <AvatarImage src={postData?.user?.avatar} />
              </Avatar>
              <div
                className='flex  items-center
                user'>
                <h4 className='font-bold'>{postData?.user?.username}</h4>
                {postData?.user?._id !== currentUserId._id &&
                !currentUserId?.following.some(
                  x => x._id === postData?.user?._id
                ) ? (
                  <>
                    <span className='mx-1'>•</span>
                    <Button
                      disabled={followPending}
                      onClick={() =>
                        follow({
                          id: postData?.user?._id
                        })
                      }
                      className='h-0 p-0'
                      variant='link'>
                      Follow
                    </Button>
                  </>
                ) : null}
              </div>
            </div>
          </div>
          <div className='comments overflow-y-auto no-scrollbar max-h-[510px] overflow-hidden  flex flex-col gap-y-6 '>
            <div className='comment border-b py-6 '>
              <div className='flex gap-2'>
                <Avatar>
                  <AvatarImage src={postData?.user?.avatar} />
                </Avatar>
                <div className='content'>
                  <div>
                    <h4 className='font-bold text-sm'>
                      {postData?.user?.username}
                    </h4>
                    <p
                      className={`text-sm max-w-[310px]  no-scrollbar   md:max-w-[240px] lg:max-w-[270px] ${
                        isExpanded
                          ? 'max-h-[300px] overflow-y-auto'
                          : 'max-h-[100px] overflow-hidden text-overflow-ellipsis'
                      } break-words`}>
                      {isExpanded
                        ? postData?.content
                        : `${postData?.content.substring(0, 100)}...`}
                      {!isExpanded &&
                        postData.content.split(' ').length > 50 && (
                          <button onClick={handleReadMoreClick}>
                            Read More
                          </button>
                        )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {postComments && postComments?.length === 0 ? (
              <div className='w-full h-screen flex flex-col items-center justify-center'>
                <h1 className='text-xl text-center font-bold w-full h-full flex justify-center items-center'>
                  No Comments Yet
                </h1>
              </div>
            ) : (
              postComments?.map(comment => {
                if (!comment.parentComments.length) {
                  return (
                    <Comment
                      replyHandle={replyHandle}
                      currentUserId={currentUserId?._id}
                      comment={comment}
                    />
                  )
                }
                return null
              })
            )}
          </div>
          <div className='flex pt-2 h-[15%] flex-col justify-end bg-background absolute w-full px-1 bottom-0'>
            <div className='flex justify-start w-full border-b pb-3'>
              <div className='flex flex-row items-center justify-between gap-y-2 gap-x-2 w-6/5'>
                <ul className='flex items-center gap-2'>
                  <li
                    className='cursor-pointer'
                    onClick={() => handleLike(postId)}>
                    <span>
                      <Heart />
                    </span>
                  </li>
                  <li className='cursor-pointer'>
                    <span>
                      <Share />
                    </span>
                  </li>
                </ul>
                <h5 className='text-xs font-semibold ml-1'>
                  {moment(postData.createdAt).fromNow()}
                </h5>
              </div>
            </div>
            <div className='pt-1 w-full mb-2 shadow-none '>
              <div className=' flex items-center flex-row justify-between'>
                {isPending && <MoonLoader />}
                <Input
                  value={commentText}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  className='focus-visible:outline-none focus-visible:ring-0 w-full focus-visible:ring-offset-0 border-none shadow-none ring-0'
                  type='text'
                  placeholder='Comment'
                />
                <span
                  className=' cursor-pointer'
                  onClick={() => setTogglePicker(!togglePicker)}>
                  <SmilePlus />
                  {togglePicker && (
                    <div className='absolute top-[30%] right-0'>
                      <Picker data={data} />
                    </div>
                  )}
                </span>
                <Button
                  onClick={() => handleCommentSubmit}
                  className=''
                  variant='link'>
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => setOpenDialog(false)}
        className={` no-scrollbar fixed inset-0 z-[20] bg-black/5 ${
          openDialog
            ? 'opacity-100 visible fade-in-0  animate-in'
            : 'opaacity-0 invisible fade-out-95  animate-out'
        }`}>
        <span
          onClick={() => setOpenDialog(false)}
          className='text-xl absolute top-6 right-6'>
          <X />
        </span>
      </div>
    </div>
  )
}

export default PostDialog
