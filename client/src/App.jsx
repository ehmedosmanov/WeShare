import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { Toaster } from '@/components/ui/sonner'

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster />
    </>
  )
}

export default App
