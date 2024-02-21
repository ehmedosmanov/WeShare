import { ParallaxScroll } from '@/components/ui/parallax-scroll'
import { useGetAllPosts } from '@/hooks/PostHooks'
import React from 'react'

const Feed = () => {
  // const { data } = useGetAllPosts()

  // const images = data
  //   ?.map(post =>
  //     post.media
  //       .filter(mediaItem => mediaItem.type === 'Image')
  //       .map(mediaItem => mediaItem.url)
  //   )
  //   .flat()
  return <div>{/* <ParallaxScroll images={images?.slice(0, 10)} /> */}</div>
}

export default Feed
