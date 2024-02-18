import { Button } from '@/components/ui/button'
import React from 'react'

const MainPageSidebar = () => {
  return (
    <aside id='sidebar'>
      <div className='w-full shadow-md dark:border-0 border-2 bg-white rounded-lg dark:bg-primary-foreground/60 py-2 px-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-primary text-sm'>Recommendations for you</h3>
          <Button variant='secondary' className='rounded-full'>
            Show All
          </Button>
        </div>
      </div>
    </aside>
  )
}

export default MainPageSidebar
