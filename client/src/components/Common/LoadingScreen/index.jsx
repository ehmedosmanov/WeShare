import React from 'react'
import { PuffLoader } from 'react-spinners'
const LoadingScreen = () => {
  return (
    <div>
      <div className='flex justify-center items-center bg-white h-screen'>
        <PuffLoader color='#000' speedMultiplier={1.5} />
      </div>
    </div>
  )
}

export default LoadingScreen
