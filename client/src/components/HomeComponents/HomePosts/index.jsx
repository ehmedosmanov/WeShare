import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const HomePosts = () => {
  return (
    <section id='posts'>
      <div className='wrapper'>
        <div className='post'>
          <Card>
            <CardContent>
              <h1>Salam</h1>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default HomePosts
