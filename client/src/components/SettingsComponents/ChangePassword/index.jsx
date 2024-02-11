import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useForm } from 'react-hook-form'
import { useChangePassword } from '@/hooks/UsersHooks'

const ChangePasswordTab = ({ value }) => {
  const { formState, register, reset, handleSubmit, setValue } = useForm({
    defaultValues: {
      oldPassword: '',
      newPassword: ''
    }
  })

  const { mutate } = useChangePassword()

  const onSubmit = data => {
    console.log(data)
    mutate(data, {
      onSuccess: () => {
        reset()
      }
    })
  }
  return (
    <>
      <TabsContent value={value}>
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='oldPassword'>Current password</Label>
                <Input
                  {...register('oldPassword')}
                  id='oldPassword'
                  type='password'
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='newPassword'>New password</Label>
                <Input
                  {...register('newPassword')}
                  id='newPassword'
                  type='password'
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit'>Save password</Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </>
  )
}

export default ChangePasswordTab
