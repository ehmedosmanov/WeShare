import UserFollowers from '@/components/ProfileComponents/UserFollowers'
import UserPosts from '@/components/ProfileComponents/UserPosts'
import UserProfileHeading from '@/components/ProfileComponents/UserProfileHeading'
import { useGetUserProfile } from '@/hooks/UsersHooks'
import React, { lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { id } = useParams()
  const getUserProfile = useGetUserProfile(id)
  return (
    <>
      <Helmet>
        <title>Profile </title>
      </Helmet>
      <UserProfileHeading id={id} {...getUserProfile} />
      <UserPosts id={id} />
    </>
  )
}

export default Profile
