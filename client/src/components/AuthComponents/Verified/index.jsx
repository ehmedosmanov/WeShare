import React from 'react'
import { BadgeCheck } from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

const VerifiedCard = () => {
  return (
    <>
      <Card className=' px-2 text-center flex flex-col justify-center items-center space-y-8 py-7'>
        <div className='w-full flex justify-center items-center text-4xl'>
          <span className='text-4xl'>
            <BadgeCheck size={50} strokeWidth={2} />
          </span>
        </div>
        <CardContent>
          <p className='text-xl font-semibold'>Email Verified</p>
          <p>Your email has been successfully verified.</p>
          <p>You can now access all the features of our platform.</p>
          <Button>
            <Link to={'/'}>Go to Home</Link>
          </Button>
        </CardContent>
        <CardFooter>
          <p>Thank you for verifying your email.</p>
        </CardFooter>
      </Card>
    </>
  )
}

export default VerifiedCard
