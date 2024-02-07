import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Cookies from 'js-cookie'
import { useLocation } from 'react-router-dom'
import { useGetMe } from '@/hooks/UsersHooks'
import { api } from '@/services/api'
import Users from '@/components/HomeComponents/Users'
const Home = () => {
  const { data: userMe, isLoading } = useGetMe()
  if (isLoading) return <h1>...lOADING</h1>
  console.log(userMe)

  return (
    <>
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <main>
        <h1 className='text-3xl'> {userMe?.username} Home</h1>
        <img src={userMe?.cover} alt='' />
        <ul>
          <li></li>
          <Users />
        </ul>
      </main>
    </>
  )
}

export default Home
