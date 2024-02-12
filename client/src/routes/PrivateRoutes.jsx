import LoadingScreen from '@/components/Common/LoadingScreen'
import { useIsAuth } from '@/hooks/AuthHooks'
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
const PrivateRoute = ({ component: Component, publicOnly, ...rest }) => {
  //TODO: Auth Logic

  const { data, isLoading, isSuccess, isError } = useIsAuth()
  console.log(data)

  if (isLoading) {
    return <LoadingScreen />
  }

  if (isError) {
    toast.error('An error occurred while checking authentication status')
    return <Navigate to='/error' replace />
  }

  const isAuthenticated = data?.isAuthenticated ?? false

  if (isSuccess) {
    if (publicOnly && isAuthenticated) {
      toast.info('You are already authenticated.')
      return <Navigate to='/' replace />
    }

    if (!publicOnly && !isAuthenticated) {
      toast.error('User is not authenticated')
      return <Navigate to='/auth/login' replace />
    }
  }

  return <Component {...rest} />
}
export default PrivateRoute
