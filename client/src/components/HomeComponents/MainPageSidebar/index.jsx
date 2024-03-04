import { Button } from '@/components/ui/button'
import { useSocketContext } from '@/context/SocketContext'
import { useGetMe, useGetUsers } from '@/hooks/UsersHooks'
import { getUsers } from '@/services/user-service'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const MainPageSidebar = () => {
  const { onlineUsers } = useSocketContext()
  const { data: users, isLoading } = useGetUsers()
  const { data: current } = useGetMe()
  const navigate = useNavigate()
  const [findOnlineUsers, setFindOnlineUsers] = useState([])

  useEffect(() => {
    console.log('Users:', users)
    console.log('Current User:', current)
    console.log('Online Users:', onlineUsers)

    // const followingsUserIds = current?.following

    if (users && current) {
      const onlineUsersData = users.filter(
        user =>
          onlineUsers.includes(user?._id) &&
          current?.following.some(x => x?._id === user?._id) &&
          user._id !== current._id
      )
      console.log('Filtered Online Users:', onlineUsersData)
      setFindOnlineUsers(onlineUsersData)
    }
  }, [onlineUsers, users, current])

  return (
    <aside id='sidebar'>
      <div className='w-full shadow-md dark:border-0 border-2 bg-white rounded-lg dark:bg-primary-foreground/60 px-4 py-4'>
        <div className='flex items-center justify-between'>
          <h3 className='text-primary text-md'>Online users</h3>
        </div>
        <ul className='flex flex-col w-full items-start justify-start gap-3 py-4'>
          {findOnlineUsers.length ? (
            findOnlineUsers.map(x => (
              <li
                key={x?._id}
                className='flex items-center cursor-pointer border w-full border-primary/20 py-2 px-2 rounded-md'
                onClick={() => navigate(`/profile/${x?._id}`)}>
                <Avatar>
                  <AvatarImage src={x?.avatar} />
                </Avatar>
                <h4 className='ml-3'>{x?.username}</h4>
              </li>
            ))
          ) : (
            <>
              <h1>Not Found Online Users</h1>
            </>
          )}
        </ul>
      </div>
    </aside>
  )
}

export default MainPageSidebar
