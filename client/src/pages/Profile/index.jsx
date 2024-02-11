import UserPosts from '@/components/ProfileComponents/UserPosts'
import UserProfileHeading from '@/components/ProfileComponents/UserProfileHeading'
import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { LazyLoadComponent } from 'react-lazy-load-image-component'

const Profile = () => {
  return (
    <>
      <Helmet>
        <title>Profile </title>
      </Helmet>
      <LazyLoadComponent>
        <UserProfileHeading />
      </LazyLoadComponent>
      <LazyLoadComponent>
        <UserPosts />
      </LazyLoadComponent>
    </>
  )
}

export default Profile
