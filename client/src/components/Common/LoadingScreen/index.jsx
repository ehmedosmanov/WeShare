import React from 'react'
import { PuffLoader } from 'react-spinners'
const LoadingScreen = () => {
  return (
    <div className='absolute top-0 left-0 flex z-[80] justify-center w-full items-center bg-background h-full'>
      <PuffLoader color='#fff' speedMultiplier={1.5} />
    </div>
  )
}

export default LoadingScreen
