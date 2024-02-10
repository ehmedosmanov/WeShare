import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import './index.scss'
import 'swiper/css'
import { Camera } from 'lucide-react'

const Stories = () => {
  return (
    <section className='stories flex flex-col justify-center items-start overflow-hidden '>
      <div className='heading flex justify-start w-full'>
        <h4 className='text-[44px] font-bold'>Stories</h4>
      </div>
      <div className=' pt-8 pb-12'>
        <Swiper
          pagination={{
            clickable: true
          }}
          breakpoints={{
            1134: {
              slidesPerView: 7,
              spaceBetween: 20
            },
            992: {
              slidesPerView: 6
            },
            576: {
              slidesPerView: 4
            },
            0: {
              slidesPerView: 3,
              spaceBetween: 5
            }
          }}
          className='mySwiper'>
          {/* <SwiperSlide className='flex justify-center items-center rounded-full '>
            <div className='bg-green-400 w-14 h-14  rounded-full flex justify-center items-center border-2'>
              <Camera />
            </div>
          </SwiperSlide> */}

          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className='duration-300'>
            <div className='duration-300   rounded-full  overflow-hidden'>
              <img
                className='rounded-full border-red-100 p-1 border-[3px] object-cover duration-300 w-full'
                src='https://demo.foxthemes.net/instello/assets/images/avatars/avatar-2.jpg'
                alt=''
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  )
}

export default Stories
