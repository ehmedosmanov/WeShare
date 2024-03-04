import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'
import { Helmet } from 'react-helmet-async'
import GridAnimations from '@/components/animate/GridLineAnimation'
const AuthLayout = () => {
  return (
    <>
      <>
        <Helmet>
          <title>Connect and Share - Your Social Media Hub | WeShare</title>
          <meta
            name='description'
            content='Connect with friends, share your moments, and explore a world of social connections on WeShare - your ultimate social media hub.'
          />
          <meta
            name='keywords'
            content='social media, connect, share, friends, community, social network'
          />
          <meta name='author' content='WeShare' />
        </Helmet>
        <main>
          <section className=' flex items-center justify-center w-full'>
            <Outlet />
            <GridAnimations />
          </section>
        </main>
        <Footer />
      </>
    </>
  )
}

export default AuthLayout
