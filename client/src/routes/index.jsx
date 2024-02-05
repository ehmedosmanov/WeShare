import LoadingScreen from '@/components/Common/LoadingScreen'
import AuthLayout from '@/layout/AuthLayout'
import MainLayout from '@/layout/Main'
import Login from '@/pages/AuthPages/Login'
import Register from '@/pages/AuthPages/Register'
import { Suspense, lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import PrivateRoute from './PrivateRoutes'

const Loadable = Component => props => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  )
}

const LoginPage = Loadable(lazy(() => import('@/pages/AuthPages/Login')))
const RegisterPage = Loadable(lazy(() => import('@/pages/AuthPages/Register')))
const Home = Loadable(lazy(() => import('@/pages/Home')))
const Profile = Loadable(lazy(() => import('@/pages/Profile')))

export const routes = createBrowserRouter([
  {
    path: '/Auth',
    element: <AuthLayout />,
    children: [
      { path: 'Login', element: <LoginPage /> },
      { path: 'Register', element: <RegisterPage /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <PrivateRoute component={Home} /> },
      { path: 'Profile', element: <PrivateRoute component={Profile} /> }
    ]
  }
])
