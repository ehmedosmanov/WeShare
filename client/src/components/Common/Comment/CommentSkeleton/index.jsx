import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

const CommentSkeleton = () => {
  return (
    <div>
      <div className='comment p-2'>
        <div className='flex gap-2'>
          <Avatar>
            <Skeleton className={' h-10 w-10 rounded-full'} />
          </Avatar>
          <div className='content'>
            <div>
              <h4 className='font-bold text-sm mb-3'>
                <Skeleton className={'h-3 w-14'} />
              </h4>
              <p
                className={`text-sm max-w-[310px]  no-scrollbar   md:max-w-[240px] lg:max-w-[270px max-h-[300px] no-scrollbar overflow-y-auto break-words`}>
                <Skeleton className={'h-8 w-48'} />
              </p>
              <div className='flex'>
                <div className='flex items-center'>
                  <span className='text-muted-foreground text-xs'>
                    <Skeleton />
                  </span>
                  <Button variant='link'>
                    <Skeleton />
                  </Button>
                  <span>
                    <Skeleton />
                  </span>
                </div>
                <div>
                  <Button variant='link text-sm  h-0 p-0'>
                    <Skeleton />
                  </Button>
                </div>
              </div>
              <div className={`replies`}>
                <Skeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentSkeleton
