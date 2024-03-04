import { useGetMe } from '@/hooks/UsersHooks'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Navigate } from 'react-router-dom'
import LoadingScreen from '@/components/Common/LoadingScreen'
const AdminRoute = ({ component: Component, ...rest }) => {
  const { data: currenUser, isLoading } = useGetMe()
  const [isDataLoaded, setisDataLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      setisDataLoaded(true)
    }
  }, [isLoading])

  if (!isDataLoaded) return <LoadingScreen />

  if (currenUser?.role === 'Admin' || currenUser?.role === 'superAdmin') {
    return <Component {...rest} />
  } else {
    toast.error('You dont have permission to access this page')
    return <Navigate to='/' replace />
  }
}

export default AdminRoute
