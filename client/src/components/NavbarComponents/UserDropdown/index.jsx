import React from 'react'
import {
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useGetMe } from '@/hooks/UsersHooks'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Link } from 'react-router-dom'
import { useLogOut } from '@/hooks/AuthHooks'

const UserDropdown = () => {
  const { data: currentUser, isLoading, isError, isSuccess } = useGetMe()
  const { mutate } = useLogOut()

  const fallBack =
    currentUser?.firstName?.charAt(0) + currentUser?.lastName?.charAt(0)
  return (
    <>
      <DropdownMenu className='mr-8'>
        <DropdownMenuTrigger asChild>
          <Avatar className='border border-primary/10'>
            <AvatarImage src={currentUser?.avatar} />
            <AvatarFallback>{fallBack.toString().toUpperCase()}</AvatarFallback>
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
            <DropdownMenuItem>
              <Settings className='mr-2 h-4 w-4' />
              <span>Settings</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          {/* <DropdownMenuGroup>
            <DropdownMenuItem>
              <Plus className='mr-2 h-4 w-4' />
              <span>New Post</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator /> */}
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
