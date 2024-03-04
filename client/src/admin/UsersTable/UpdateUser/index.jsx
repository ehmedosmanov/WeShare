import React from 'react'
import UserForm from '../CreateUser'
import { useParams } from 'react-router-dom'
import { useGetUserById } from '@/hooks/UsersHooks'
const UpdateUser = () => {
  const { id } = useParams()

  const { data, isLoading } = useGetUserById(id)

  if (isLoading) return <h1>...Loading</h1>

  return (
    <>
      <UserForm initialData={data} />
    </>
  )
}

export default UpdateUser
