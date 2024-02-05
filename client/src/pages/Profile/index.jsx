import React from 'react'
import { Helmet } from 'react-helmet-async'

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <main>
        <h1 className='text-3xl'> Hello Profile</h1>
      </main>
    </>
  )
}

export default Profile
