import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useGetMe } from '@/hooks/UsersHooks'
import { api } from '@/services/api'
import MainPage from '@/components/HomeComponents/MainPage'
import Stories from '@/components/HomeComponents/Stories'
const Home = () => {
  // const { data: userMe, isLoading } = useGetMe()

  return (
    <>
      <Helmet>
        <title>Feed</title>
      </Helmet>
      {/* <Stories /> */}
      <MainPage />
    </>
  )
}

export default Home
