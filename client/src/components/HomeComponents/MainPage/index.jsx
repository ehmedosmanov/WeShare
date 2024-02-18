import React from 'react'
import HomePosts from '../HomePosts'
import MainPageSidebar from '../MainPageSidebar'

const MainPage = () => {
  return (
    <section className=''>
      <div className='grid grid-cols-1 lg:grid-cols-12 items-center gap-y-4 gap-x-4'>
        <div className='col-span-1 lg:order-1 order-2 lg:col-span-8'>
          <HomePosts />
        </div>
        <div className='col-span-1 order-1 lg:col-span-4 w-full h-full'>
          <MainPageSidebar />
        </div>
      </div>
    </section>
  )
}

export default MainPage
