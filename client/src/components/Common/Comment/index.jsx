import React, { useEffect, useState } from 'react'
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
import ReplyComment from '../ReplyComment'
import { useDeleteComment } from '@/hooks/PostHooks'
import CommentSkeleton from './CommentSkeleton'

const Comment = ({ replyHandle, comment, currentUserId }) => {
  const [viewReply, setWiewReply] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)
  const { mutate, isPending } = useDeleteComment(setIsDeleted)

  const handleReadMoreClick = () => {
    setIsExpanded(true)
  }

  if (isPending || isDeleted) return <CommentSkeleton />
  return (
    <div className='comment p-2'>
      <div className='flex gap-2'>
        <Avatar>
          <AvatarImage src={comment?.user?.avatar} />
        </Avatar>
        <div className='content'>
          <div>
            <h4 className='font-bold text-sm'>{comment?.user?.username}</h4>
            <p
              className={`text-sm max-w-[310px]  no-scrollbar   md:max-w-[240px] lg:max-w-[270px]   ${
                isExpanded
                  ? 'max-h-[300px] no-scrollbar overflow-y-auto'
                  : 'max-h-[100px] overflow-hidden text-overflow-ellipsis'
              } break-words`}>
              {isExpanded
                ? comment.content
                : `${comment?.content.substring(0, 100)}`}
              {!isExpanded && comment.content.split(' ').length > 50 && (
                <button onClick={handleReadMoreClick}>Read more</button>
              )}
            </p>
            <div className='flex'>
              <div className='flex items-center'>
                <span className='text-muted-foreground text-xs'>
                  {moment(comment.createdAt).fromNow()}
                </span>
                <Button
                  onClick={() =>
                    replyHandle(comment?.user?.username, comment?._id)
                  }
                  variant='link'>
                  Reply
                </Button>
                <span className=''>
                  <AlertDialog className='!z-[120]'>
                    {comment?.user?._id === currentUserId ? (
                      <AlertDialogTrigger asChild>
                        <Button variant='link'>• • •</Button>
                      </AlertDialogTrigger>
                    ) : null}
                    <AlertDialogContent className="z-[999999]">
                      <AlertDialogAction
                        onClick={() => mutate(comment?._id)}
                        className='bg-red-600/70'>
                        Delete
                      </AlertDialogAction>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                    </AlertDialogContent>
                  </AlertDialog>
                </span>
              </div>
              {comment.replies && comment.replies.length !== 0 ? (
                <div>
                  <Button
                    onClick={() => setWiewReply(prevState => !prevState)}
                    variant='link text-sm  h-0 p-0'>
                    {viewReply ? 'Hide Replies' : 'Show Replies'}
                  </Button>
                </div>
              ) : null}
            </div>
            <div className={`replies ${viewReply ? 'block' : 'hidden'}`}>
              {comment.replies && comment.replies.length > 0
                ? comment.replies.map(replies => (
                    <ReplyComment
                      currentUserId={currentUserId}
                      replyHandle={replyHandle}
                      commentId={comment?._id}
                      replies={replies}
                    />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Comment
