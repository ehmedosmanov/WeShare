import React from 'react'
import { PuffLoader } from 'react-spinners'
const LoadingScreen = () => {
  return (
    <div className='fixed flex justify-center w-full items-center bg-background h-screen'>
      <PuffLoader color='#fff' speedMultiplier={1.5} />
    </div>
  )
}

export default LoadingScreen
