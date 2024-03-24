import {
  useDeleteFromHistory,
  useGetMe,
  useGetSearchHistory,
  useGetUsers,
  useSaveSearchHistory
} from '@/hooks/UsersHooks'
import { useState, useEffect } from 'react'
import { BadgeCheck, Lock, Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import useOpenSearch from '@/hooks/use-open-search'
import {
  CommandDialog,
  CommandInput,
  CommandList
} from '@/components/ui/command'
const SearchUsers = () => {
  const { data: users, isLoading, isSuccess } = useGetUsers()
  const { mutate: deleteHisotory, isPending } = useDeleteFromHistory()
  const {
    data: searchHistoryData,
    isLoading: searchHistoryLoading,
    isSuccess: searchSuccess
  } = useGetSearchHistory()

  const {
    data: currentUser,
    isLoading: currentUserLoading,
    isSuccess: currentUserSuccess
  } = useGetMe()
  const { mutate: saveHistory } = useSaveSearchHistory()
  const [searchedUsers, setSearchedUsers] = useState([])
  const { open, setOpen } = useOpenSearch()
  const [query, setQuery] = useState('')

  useEffect(() => {
    const down = e => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  useEffect(() => {
    if (query.trim()) {
      const filteredUsers = users?.filter(
        user =>
          user.username
            .trim()
            .toLowerCase()
            .includes(query.trim().toLowerCase()) &&
          user._id !== currentUser._id
      )
      setSearchedUsers(filteredUsers)
    } else {
      setSearchedUsers([])
    }
  }, [query])

  const searchHistory = searchHistoryData || []

  const handleDeleteHisotory = id => {
    console.log(`Delete hisory`, id)
    deleteHisotory(id)
  }

  const handleSaveHistory = id => {
    console.log(`Save hisory`, id)
    saveHistory(id)
  }

  return (
    <>
      <div className='w-2/6 hidden md:block dark:bg-secondary'>
        <Button
          onClick={setOpen}
          className='w-full bg-accent border border-primary/20  dark:bg-background/50 py-3 flex justify-between hover:bg-background/80'>
          <span className='hidden lg:flex text-muted-foreground'>
            Search users..
          </span>
          <p className='hidden gap-1 items-center lg:flex text-sm text-muted-foreground'>
            <span className='mb-[1px]'>Press</span>
            <kbd className='pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border  px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
              <span className='text-xs'>Ctrl</span>K
            </kbd>
          </p>

          <Search className='lg:hidden w-6 h-6 text-muted-foreground mr-1' />
          <span className='lg:hidden text-sm text-muted-foreground'>
            Search..
          </span>
        </Button>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          type='text'
          placeholder='Type a username...'
          className='focus-visible:ring-0 ring-white focus-visible:ring-white border-b border-b-accent'
          value={query}
          onValueChange={e => setQuery(e)}
        />

        <CommandList>
          {query.trim() ? (
            searchedUsers?.length > 0 ? (
              searchedUsers?.map(user => (
                <div
                  key={user.id}
                  className='mx-2 p-2 rounded hover:bg-accent flex justify-between items-center'>
                  <div className='flex gap-2 items-center'>
                    <Avatar>
                      <AvatarImage src={user?.avatar} />
                    </Avatar>
                    <Link
                      className='flex items-center gap-x-2'
                      to={`/profile/${user?._id}`}
                      onClick={() => {
                        setOpen(false)
                        handleSaveHistory(user?._id)
                        setQuery('')
                      }}>
                      {user?.username}
                    </Link>
                  </div>

                  <div className=''>
                    {/* <Button
                      variant={'default'}
                      className={'py-1 h-9 rounded-full'}>
                      Delete
                    </Button> */}
                  </div>
                </div>
              ))
            ) : (
              <CommandList className='text-center py-5'>
                No searched User.
              </CommandList>
            )
          ) : (
            <>
              <div className='flex flex-col py-2'>
                {searchHistory
                  ? searchHistory.map(user => (
                      <div
                        key={user._id}
                        className='mx-2 p-2 rounded hover:bg-accent flex justify-between items-center'>
                        <div className='flex gap-2 items-center'>
                          <Avatar>
                            <AvatarImage src={user?.avatar} />
                          </Avatar>
                          <Link
                            className='flex items-center gap-x-2'
                            to={`/profile/${user?._id}`}
                            onClick={() => {
                              setOpen(false)
                              mutate({
                                id: user?._id
                              })
                            }}>
                            {user?.username}
                          </Link>
                        </div>

                        <div className=''>
                          <Button
                            onClick={() => handleDeleteHisotory(user?._id)}
                            variant={'default'}
                            className={'h-6 w-6 px-0 rounded-full'}>
                            <X size={18} />
                          </Button>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
              {searchHistory.length === 0 && (
                <CommandEmpty className='text-center py-5'>
                  No searched.
                </CommandEmpty>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchUsers
