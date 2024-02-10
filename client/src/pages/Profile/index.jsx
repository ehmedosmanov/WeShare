import UserPosts from '@/components/ProfileComponents/UserPosts'
import UserProfileHeading from '@/components/ProfileComponents/UserProfileHeading'
import React from 'react'
import { Helmet } from 'react-helmet-async'

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <UserProfileHeading />
      <UserPosts />
    </>
  )
}

export default Profile
