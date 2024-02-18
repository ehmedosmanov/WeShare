import React, { useEffect, useState } from 'react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import ReactPlayer from 'react-player'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Navigation } from 'swiper/modules'
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import { LazyLoadImage } from 'react-lazy-load-image-component'

const MediaPreview = ({ files }) => {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={swiper => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}>
        {files.map((file, index) => (
          <SwiperSlide key={index}>
            <AspectRatio className='max-w-100' ratio={1 / 1}>
              <div className='h-full'>
                {file.fileType === 'video/mp4' ? (
                  <ReactPlayer
                    className='customVideo'
                    controls={true}
                    loop={true}
                    width='100%'
                    height='100%'
                    url={URL.createObjectURL(file.file)}
                  />
                ) : (
                  <LazyLoadImage
                    src={URL.createObjectURL(file.file)}
                    alt='Preview'
                  />
                )}
              </div>
            </AspectRatio>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}

export default MediaPreview
