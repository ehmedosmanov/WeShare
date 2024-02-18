import { useState } from 'react'
import './App.css'
import { RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { Toaster } from '@/components/ui/sonner'
// import {
//   // editor
//   openEditor,
//   locale_en_gb,
//   createDefaultImageReader,
//   createDefaultImageWriter,
//   createDefaultImageOrienter,
//   createDefaultShapePreprocessor,
//   legacyDataToImageState,
//   processImage,
//   setPlugins,
//   plugin_crop,
//   plugin_crop_locale_en_gb,
//   plugin_finetune,
//   plugin_finetune_locale_en_gb,
//   plugin_finetune_defaults,
//   plugin_filter,
//   plugin_filter_locale_en_gb,
//   plugin_filter_defaults,
//   plugin_annotate,
//   plugin_annotate_locale_en_gb,
//   markup_editor_defaults,
//   markup_editor_locale_en_gb
// } from '@pqina/pintura'

// import 'filepond/dist/filepond.min.css'
// import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
// import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
// import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
// import { registerPlugin } from 'filepond'
// import FilePondPluginImageEditor from '@pqina/filepond-plugin-image-editor'
// registerPlugin(
//   FilePondPluginImageExifOrientation,
//   FilePondPluginImageEditor,
//   FilePondPluginImagePreview
// )
// setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate)

function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <Toaster position='top-center' richColors />
    </>
  )
}

export default App
