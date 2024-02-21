import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const PostSkeleton = () => {
  return (
    <div>
      <AspectRatio ratio={1 / 1}>
        <Skeleton className={'w-25 h-25'} />
      </AspectRatio>
    </div>
  )
}

export default PostSkeleton
