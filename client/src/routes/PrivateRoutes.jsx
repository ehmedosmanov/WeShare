import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { toast } from 'sonner'
const PrivateRoute = ({ component: Component, authenticated, ...rest }) => {
  //TODO: Auth Logic
  //   const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isAuthenticated = false
  if (!isAuthenticated) {
    toast.error('Event has been created.')
    return <Navigate to='/auth/login' replace />
  }

  return <Component {...rest} />
}
export default PrivateRoute
