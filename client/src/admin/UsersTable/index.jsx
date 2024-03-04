import React from 'react'
import TableView from './TableView'
import { useGetUsers } from '@/hooks/UsersHooks'

const UserDashboard = () => {
  const { data, isLoading } = useGetUsers()
  console.log(data)
  if (isLoading) return <h1>...Loading</h1>
  return (
    <section id='users'>
      <TableView data={data} />
    </section>
  )
}

export default UserDashboard
