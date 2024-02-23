import React from 'react'
import { Button } from '@/components/ui/button'
import { MoonLoader } from 'react-spinners'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { PlusCircle } from 'lucide-react'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { Textarea } from '@/components/ui/textarea'
import MediaPreview from '@/components/ProfileSidebar/MediaPreview'
import FileUploader from '@/components/FileUploader'
import { cn } from '@/lib/utils'

const CreatePostDialog = ({
  step,
  files,
  setFiles,
  content,
  handleContentChange,
  handlePrevStep,
  handleSubmit,
  isPending,
  handleNextStep
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <li
            className='flex justify-center lg:justify-start items-center gap-x-4 bg-none md:bg-primary-foreground/60 hover:bg-accent dark:hover:bg-primary-foreground/100 duration-300 py-3  px-3 border-1 md:border-2 shadow-sm cursor-pointer w-full h-full rounded-lg text-black dark:text-white'
            variant='outline'>
            <span>
              <PlusCircle />
            </span>
            <span
              className={cn(
                'lg:inline hidden duration-100',
                location.pathname === '/chat' ? ' invisible' : ''
              )}>
              Create
            </span>
          </li>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[30%] sm:min-h-[30%]'>
          <DialogHeader>
            <DialogTitle>Create Post</DialogTitle>
            <DialogDescription>
              Make post for your profile here.
            </DialogDescription>
          </DialogHeader>
          <div className='grid gap-4 py-4'>
            {step === 0 && (
              <>
                <FileUploader files={files} setFiles={setFiles} />
              </>
            )}
            {/* {step === 1 && <MediaPreview files={files} />} */}
            {step === 1 && (
              <div>
                <span>
                  <Label htmlFor='content'>Content</Label>
                </span>
                <Textarea
                  name='content'
                  value={content}
                  onChange={handleContentChange}
                />
              </div>
            )}
          </div>
          <DialogFooter className={' items-end justify-end'}>
            <div className='flex gap-2'>
              {step >= 1 && (
                <Button
                  className='flex items-start  justify-start'
                  onClick={handlePrevStep}
                  variant={'secondary'}>
                  Prev
                </Button>
              )}
              {step === 2 ? (
                <Button onClick={handleSubmit}>
                  {isPending ? (
                    <MoonLoader size={22} color='#000' />
                  ) : (
                    <>Submit</>
                  )}
                </Button>
              ) : (
                <>
                  {files?.length > 0 && (
                    <Button onClick={handleNextStep} variant={'secondary'}>
                      Next
                    </Button>
                  )}
                </>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreatePostDialog
