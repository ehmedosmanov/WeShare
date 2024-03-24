import React from 'react'
import { LogOut, Settings, User, Shield } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetMe } from '@/hooks/UsersHooks'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { useLogOut } from '@/hooks/AuthHooks'
import { Skeleton } from '@/components/ui/skeleton'

const UserDropdown = () => {
  const { data: currentUser, isLoading, isError, isSuccess } = useGetMe()
  const { mutate } = useLogOut()

  if (isLoading)
    return (
      <>
        <Avatar className='border border-primary/10'>
          <Skeleton className={'w-5 h-5'} />
        </Avatar>
      </>
    )

  console.log('AYBLETTTTTTTTTTTTTTTTTTTTTT', currentUser)

  return (
    <>
      <DropdownMenu className='mr-8'>
        <DropdownMenuTrigger asChild>
          <Avatar className='border border-primary/10'>
            <AvatarImage src={currentUser?.avatar} />
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-56'>
          <DropdownMenuLabel>{currentUser?.username}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link to={`/profile/${currentUser?._id}`}>
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
            </Link>
            <Link to='/Settings'>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {currentUser?.role === 'Admin' ||
          currentUser?.role === 'superAdmin' ? (
            <Link to={'/Admin'} className=' cursor-pointer'>
              <DropdownMenuItem>
                <Shield className='mr-2 h-4 w-4' />
                <span>Admin Panel</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </Link>
          ) : null}
          <DropdownMenuItem onClick={mutate}>
            <LogOut className='mr-2 h-4 w-4' />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default UserDropdown
