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
const VerifiedPage = Loadable(
  lazy(() => import('@/pages/AuthPages/VerifyPage'))
)
const Home = Loadable(lazy(() => import('@/pages/Home')))
const Profile = Loadable(lazy(() => import('@/pages/Profile')))
const Settings = Loadable(lazy(() => import('@/pages/SettingsProfile')))
const Feed = Loadable(lazy(() => import('@/pages/Feed')))
const Chat = Loadable(lazy(() => import('@/pages/Chat')))
export const routes = createBrowserRouter([
  {
    path: '/Auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'Login',
        element: <PrivateRoute publicOnly component={LoginPage} />
      },
      {
        path: 'Register',
        element: <PrivateRoute publicOnly component={RegisterPage} />
      },
      {
        path: 'Verified',
        element: <PrivateRoute publicOnly component={VerifiedPage} />
      }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <PrivateRoute component={Home} /> },
      { path: 'Profile/:id', element: <PrivateRoute component={Profile} /> },
      { path: 'Feed', element: <PrivateRoute component={Feed} /> },
      { path: 'settings', element: <PrivateRoute component={Settings} /> },
      { path: 'chat', element: <PrivateRoute component={Chat} /> }
    ]
  }
])
