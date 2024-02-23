import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useDeleteComment } from '@/hooks/PostHooks'

const ReplyComment = ({ replyHandle, replies, commentId, currentUserId }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const { mutate } = useDeleteComment()
  const handleReadMoreClick = () => {
    setIsExpanded(true)
  }
  return (
    <div className='comment-reply  mr-8 p-2'>
      <div className='flex gap-2'>
        <Avatar>
          <AvatarImage src={replies?.user?.avatar} />
        </Avatar>
        <div className='content'>
          <div>
            <h4 className='font-bold text-sm'>{replies?.user?.username}</h4>
            <p
              className={`text-sm max-w-[310px]  no-scrollbar   md:max-w-[240px] lg:max-w-[270px]   ${
                isExpanded
                  ? 'max-h-[300px] no-scrollbar overflow-y-auto'
                  : 'max-h-[100px] overflow-hidden text-overflow-ellipsis'
              } break-words`}>
              {isExpanded
                ? replies?.content
                : `${replies?.content?.substring(0, 100)}...`}
              {!isExpanded && replies?.content?.split(' ').length > 50 && (
                <button onClick={handleReadMoreClick}>Read more</button>
              )}
            </p>
            <div className='flex'>
              <div className='flex items-center'>
                <span className='text-muted-foreground text-xs'>
                  {moment(replies.createdAt).fromNow()}
                </span>
                <Button
                  variant='link'
                  onClick={() =>
                    replyHandle(replies?.user?.username, replies?._id)
                  }>
                  Reply
                </Button>
                <span>
                  <AlertDialog className='z-100'>
                    {replies?.user?._id === currentUserId ? (
                      <AlertDialogTrigger asChild>
                        <Button variant='link'>• • •</Button>
                      </AlertDialogTrigger>
                    ) : null}
                    <AlertDialogContent>
                      <AlertDialogAction
                        onClick={() => mutate(replies._id)}
                        className='bg-red-600/70'>
                        Delete
                      </AlertDialogAction>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogContent>
                  </AlertDialog>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReplyComment
