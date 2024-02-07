import { useGetUsers } from '@/hooks/UsersHooks'
import React from 'react'

const Users = () => {
  const { data: users, isLoading: usersLoading } = useGetUsers()
  if (usersLoading) return <h1>...lOADING</h1>
  console.log(users)
  return (
    <div>
      {users.map(user => (
        <div key={user?._id}>{user?.username}</div>
      ))}
    </div>
  )
}

export default Users
