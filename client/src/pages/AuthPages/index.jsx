import React from 'react'
import { Helmet } from 'react-helmet-async'

const Auth = () => {
  return (
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
        <h1 className='text-9xl'>WE SHARE</h1>
      </main>
    </>
  )
}

export default Auth
