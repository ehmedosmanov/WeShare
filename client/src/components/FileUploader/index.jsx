import React from 'react'
import { toast } from 'sonner'
import { FilePond } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'

const FileUploader = ({ files, setFiles }) => {
  return (
    <div className='max-h-[400px] overflow-auto'>
      <FilePond
        maxFiles={10}
        files={files}
        allowMultiple={true}
        onupdatefiles={setFiles}
        acceptedFileTypes={[
          'image/png',
          'image/jpg',
          'image/jpeg',
          'video/mp4',
          'video/mpeg'
        ]}
        beforeAddFile={(item, options) => {
          if (item.length > 10) {
            toast.error('You can upload only a maximum of 10 files')
            return false
          }
          if (
            ![
              'image/png',
              'image/jpg',
              'image/jpeg',
              'video/mp4',
              'video/mpeg'
            ].includes(item.fileType)
          ) {
            toast.warning(
              'Only PNG, JPG, JPEG, MP4, and MPEG files are allowed'
            )
            return false
          }
        }}
        name='media'
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
    </div>
  )
}

export default FileUploader
