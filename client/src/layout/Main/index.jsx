import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer'

const MainLayout = () => {
  return (
    <>
      <Outlet />
    </>
  )
}

export default MainLayout
