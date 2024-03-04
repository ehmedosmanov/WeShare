import React from 'react'

const Heading = ({ title, description }) => {
  return (
    <div>
      <h2 className='text-3xl font-bold pb-1 tracking-tight'>{title}</h2>
      <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

export default Heading
