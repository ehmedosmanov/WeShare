import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

export const PostDialogSkeleton = () => {
  return (
    <div
      className={`max-h-[600px] overflow-y-auto lg:overflow-y-hidden lg:max-h-[610px]  border dialog fixed left-[50%] top-[50%] z-[52]  w-full translate-x-[-50%] translate-y-[-50%] grid overflow-hidden grid-cols-1 md:grid-cols-2  rounded-2xl border-none bg-background shadow-lg duration-200  sm:rounded-lg  max-w-[300px] sm:max-w-[400px] md:max-w-[660px] lg:max-w-[820px]`}>
      <div className=' w-full h-full overflow-hidden'>
        <Skeleton className={'w-[700px] h-[700px]'} />
      </div>
      <div className='dialog-content overflow-hidden py-4 px-2 w-full border'>
        <div className='dialog-header border-b w-full pb-3 border-muted'>
          <div className='flex items-center gap-3 ml-2'>
            <Skeleton className={'w-10 h-10'} />
            <div
              className='flex  items-center
                  user'>
              <h4 className='font-bold'>
                <Skeleton className={'w-4 h-4'} />
              </h4>
              <span className='mx-1'>•</span>
              <Button className='h-0 p-0' variant='link'>
                Follow
              </Button>
            </div>
          </div>
        </div>
        <div className='comments overflow-y-auto no-scrollbar max-h-[510px] overflow-hidden  flex flex-col gap-y-6 mt-6'>
          <div className='comment p-2 '>
            <div className='flex gap-2'>
              <Avatar>
                <Skeleton className={'w-20 rounded-full'} />
              </Avatar>
              <div className='content'>
                <div>
                  <h4 className='font-bold text-sm mb-4'>
                    <Skeleton className={'w-12 h-3'} />
                  </h4>
                  <p
                    className={`text-sm max-w-[310px]  no-scrollbar   md:max-w-[240px] lg:max-w-[270px] break-words`}>
                    <button>
                      <Skeleton className={'w-[400px] h-12'} />
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
