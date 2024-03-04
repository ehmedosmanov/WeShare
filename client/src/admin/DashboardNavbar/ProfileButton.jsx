import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLogOut } from '@/hooks/AuthHooks'
import { useGetMe } from '@/hooks/UsersHooks'

const ProfileButton = () => {
  const { mutate } = useLogOut()
  const { data: currentUser } = useGetMe()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={currentUser?.avatar} />
          <AvatarFallback>AA</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{currentUser?.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          Role: {currentUser?.role === 'superAdmin' && 'Main Admin'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className='cursor-pointer' onClick={mutate}>
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileButton
