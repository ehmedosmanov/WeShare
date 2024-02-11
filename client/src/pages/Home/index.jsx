import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useGetMe } from '@/hooks/UsersHooks'
import { api } from '@/services/api'
import MainPage from '@/components/HomeComponents/MainPage'
import Stories from '@/components/HomeComponents/Stories'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
const Home = () => {
  // const { data: userMe, isLoading } = useGetMe()

  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>
      {/* <Stories /> */}
      <LazyLoadComponent>
        <MainPage />
      </LazyLoadComponent>
    </>
  )
}

export default Home
