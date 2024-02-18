import { useUploadPost } from '@/hooks/PostHooks'
import { toast } from 'sonner'
import { createContext, useState } from 'react'

export const UploadContext = createContext()

const UploadContextProvider = ({ children }) => {
  const [files, setFiles] = useState([])
  const [openDialog, setOpenDialog] = useState(false)

  const [content, setContent] = useState()
  const [step, setStep] = useState(0)
  const { mutate, isPending } = useUploadPost()

  const handleOpen = () => {
    setOpenDialog(!openDialog)
  }
  const handleContentChange = event => {
    setContent(event.target.value)
  }
  const handleNextStep = () => {
    setStep(step + 1)
  }

  const handlePrevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (files && content) {
      const formData = new FormData()
      files.forEach(file => formData.append('media', file.file))
      formData.append('content', content)

      console.log(formData)

      mutate(formData, {
        onSuccess: () => {
          setFiles([])
          setStep(0)
          setContent()
          toast.success('Successfully posted')
        },
        onError: data => {
          console.log(data)
          toast.error(data.response.data.message)
        }
      })
    } else {
      console.log('Ошибка: files или content являются undefined или null')
    }
  }

  const data = {
    step,
    files,
    isPending,
    setFiles,
    handleOpen,
    openDialog,
    content,
    handleContentChange,
    handlePrevStep,
    handleSubmit,
    handleNextStep
  }

  return (
    <UploadContext.Provider value={data}>{children}</UploadContext.Provider>
  )
}

export default UploadContextProvider
