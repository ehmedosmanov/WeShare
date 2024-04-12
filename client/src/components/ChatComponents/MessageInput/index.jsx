import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useSendMessage, useSendVoiceMessage } from '@/hooks/ChatHooks'
import { useGroupSendMessage } from '@/hooks/GroupChatHooks'
import useConversation from '@/hooks/use-conversation'
import React, { useState } from 'react'
import { AudioRecorder } from 'react-audio-voice-recorder'

const MessageInput = () => {
  const { selectedConversation } = useConversation()
  const [message, setMessage] = useState('')
  const { mutate: sendVoice, isPending: sendPending } = useSendVoiceMessage()
  const { mutate, isPending } = useSendMessage()
  const [audioData, setAudioData] = useState(null)

  console.log(audioData)
  const addAudioElement = blob => {
    const url = URL.createObjectURL(blob)
    const audio = document.createElement('audio')
    audio.src = url
    audio.controls = true
    setAudioData(blob)
  }

  const handleSubmit =  e => {
    e.preventDefault()
    if (audioData) {
      const formData = new FormData()
      formData.append('voiceMessage', audioData, 'voiceMessage.webm')
      sendVoice({
        id: selectedConversation?._id,
        formData: formData
      })
      setAudioData(null)
    } else if (message) {
    
      mutate({
        message: message,
        id: selectedConversation?._id
      })
      setMessage('')
    }
  }

  const handleKeyPress = e => {
    console.log(e.key === 'Enter')
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <>
      <div className='pt-16 pb-2'>
        <div className='write bg-background items-center shadow flex rounded-lg'>
          <div className='flex-3 flex content-center items-center text-center p-4 pr-0'>
            <span className='block text-center text-gray-400 hover:text-gray-800'></span>
          </div>
          <div className='flex-1'>
            <Input
              disabled={isPending}
              value={message}
              onChange={e => setMessage(e.target.value)}
              name='message'
              className='w-full block outline-none py-4 px-4 bg-background border'
              rows='1'
              placeholder='Type a message...'
              autofocus
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className='flex justify-center items-center'>
            <div className=' ml-4'>
              <AudioRecorder
                onRecordingComplete={addAudioElement}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true
                }}
                downloadFileExtension='webm'
              />
            </div>
            <div className='w-32 p-2 flex content-center items-center'>
              <div className='fle text-center'></div>
              <div className='flex justify-center items-center w-full'>
                <Button
                  disabled={isPending || sendPending}
                  onClick={handleSubmit}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessageInput
