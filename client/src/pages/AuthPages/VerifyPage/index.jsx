import VerifiedCard from '@/components/AuthComponents/Verified'
import { api } from '@/services/api'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useVerifyEmail } from '@/hooks/AuthHooks'
import LoadingScreen from '@/components/Common/LoadingScreen'

const Verified = () => {
  const { isLoading } = useVerifyEmail()

  return (
    <>
      <VerifiedCard />
    </>
  )
}

export default Verified
