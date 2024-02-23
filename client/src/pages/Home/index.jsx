import React, { useContext, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import MainPage from '@/components/HomeComponents/MainPage'
import { LazyLoadComponent } from 'react-lazy-load-image-component'
const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* <Stories /> */}
      <LazyLoadComponent>
        <MainPage />
      </LazyLoadComponent>
    </>
  )
}

export default Home
