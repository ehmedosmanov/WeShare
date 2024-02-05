import React from 'react'
import { Helmet } from 'react-helmet-async'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Hello World</title>
      </Helmet>
      <main>
        <h1 className='text-3xl'> Hello Home</h1>
      </main>
    </>
  )
}

export default Home
