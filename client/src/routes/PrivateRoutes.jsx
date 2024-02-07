import LoadingScreen from '@/components/Common/LoadingScreen'
import { useIsAuth } from '@/hooks/AuthHooks'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
const PrivateRoute = ({ component: Component, publicOnly, ...rest }) => {
  //TODO: Auth Logic

  const { data, isLoading, isSuccess } = useIsAuth()
  console.log(data)

  if (isLoading) {
    return <LoadingScreen />
  }

  const isAuthenticated = data?.isAuthenticated

  if (publicOnly && isAuthenticated) {
    toast.info('You are already authenticated.')
    return <Navigate to='/' replace />
  }

  if (!publicOnly && !isAuthenticated) {
    toast.error('Ay blet User is not authenticated')
    return <Navigate to='/auth/login' replace />
  }

  return <Component {...rest} />
}
export default PrivateRoute
