import VerifiedCard from '@/components/AuthComponents/Verified'
import { api } from '@/services/api'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authVerify } from '@/services/auth-service'

const Verified = () => {
  const location = useLocation()
  const queryClient = useQueryClient()
  const token = new URLSearchParams(location.search).get('token')

  const verifyEmailMutation = useMutation({
    mutationFn: () => authVerify(token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['status'] })
    }
  })
  useEffect(() => {
    if (token) {
      verifyEmailMutation.mutate()
    }
  }, [location.search])
  return (
    <>
      <VerifiedCard />
    </>
  )
}

export default Verified
