import { useGetMe } from '@/hooks/UsersHooks'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from 'react-router-dom'

const ProfileCard = () => {
  const { data: currentUser } = useGetMe()

  return (
    <>
      <div className='profie shadow-md dark:border-0 border-2 bg-white rounded-lg  items-start justify-start px-3 py-4 dark:bg-primary-foreground/60  mt-[100px]'>
        <div className='heading pl-2 mb-4 flex items-center'>
          <Link to={`/profile/${currentUser?._id}`}>
            <Avatar>
              <AvatarImage src={currentUser?.avatar} />
            </Avatar>
          </Link>
          <div className='ml-2 flex flex-col justify-start items-start'>
            <h4>
              {currentUser?.firstName} {currentUser?.lastName}
            </h4>
            <span className='text-[10px]'>@{currentUser?.username}</span>
          </div>
        </div>
        <div className='info mt-2'>
          <ul className='flex justify-between items-center'>
            <li className='flex cursor-pointer justify-center flex-col items-center'>
              <span>{currentUser?.followers.length}</span>
              <span className='text-[12px]'>Follwers</span>
            </li>
            <li className='flex cursor-pointer justify-center flex-col items-center'>
              <span>{currentUser?.followers.length}</span>
              <span className='text-[12px]'>Follwers</span>
            </li>
            <li className='flex cursor-pointer justify-center flex-col items-center'>
              <span>{currentUser?.followers.length}</span>
              <span className='text-[12px]'>Follwers</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export const ProfileCardSkeleton = () => {
  return (
    <div className='profie rounded-lg  items-start justify-start px-3 py-4 bg-primary-foreground mt-[100px]'>
      <div className='heading pl-2 mb-4 flex items-center'>
        <Skeleton className={'w-[40px] h-[40px] rounded-full'} />
        <div className='ml-2 flex flex-col justify-start items-start'>
          <Skeleton className={'w-[100px] h-[20px]'} />
          <Skeleton className={'w-[80px] h-[10px]'} />
        </div>
      </div>
      <div className='info mt-2'>
        <ul className='flex justify-between items-center'>
          <li className='flex cursor-pointer justify-center flex-col items-center'>
            <Skeleton className={'w-[30px] h-[30px]'} />
            <Skeleton className={'w-[15px] h-[10]'} />
          </li>
          <li className='flex cursor-pointer justify-center flex-col items-center'>
            <Skeleton className={'w-[30px] h-[30px]'} />
            <Skeleton className={'w-[15px] h-[10]'} />
          </li>
          <li className='flex cursor-pointer justify-center flex-col items-center'>
            <Skeleton className={'w-[30px] h-[30px]'} />
            <Skeleton className={'w-[15px] h-[10]'} />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default ProfileCard
