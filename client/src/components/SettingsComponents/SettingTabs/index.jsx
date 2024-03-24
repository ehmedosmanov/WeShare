import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import z from 'zod'
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
import { useGetMe, useUpdateProfile } from '@/hooks/UsersHooks'
import { useForm } from 'react-hook-form'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import ChangePasswordTab from '../ChangePassword'
import { MoonLoader } from 'react-spinners'
const SettingsTabs = () => {
  const { data: currentUser, isLoading } = useGetMe()
  const [isChanged, setIsChanged] = useState(false)

  if (isLoading)
    return (
      <span className='flex justify-center items-center h-full'>
        <MoonLoader size={28} />
      </span>
    )

  console.log(currentUser)

  const { register, handleSubmit, formState, setValue } = useForm({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      username: currentUser?.username,
      gender: currentUser?.gender,
      bio: currentUser?.bio
    }
  })

  const { mutate } = useUpdateProfile()

  const onSubmit = data => {
    console.log(data)
    mutate(
      {
        id: currentUser?._id,
        data: data
      },
      {
        onSuccess: () => {
          setIsChanged(false)
        },
        onError: data => {
          data.response.data.message
        }
      }
    )
  }
  return (
    <section id='setting-tab'>
      <Tabs defaultValue='description' className='w-full pt-12'>
        <TabsList className='grid w-full gap-2 grid-cols-2'>
          <TabsTrigger value='description'>Description</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
          {/* <TabsTrigger value='notification'>Notification</TabsTrigger> */}
          {/* <TabsTrigger value='avatar'>Avatar</TabsTrigger> */}
          {/* <TabsTrigger value='blocked'>Blocked</TabsTrigger> */}
          {/* <TabsTrigger value='tags'>Tags</TabsTrigger> */}
          {/* <TabsTrigger value='privacy'>Privacy</TabsTrigger> */}
          {/* <TabsTrigger value='status'>Status</TabsTrigger> */}
        </TabsList>
        <TabsContent value='description'>
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardContent className='space-y-2'>
                <div className='space-y-1'>
                  <Label htmlFor='firstName'>First Name</Label>
                  <Input {...register('firstName')} id='firstName' />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='lastName'>Last Name</Label>
                  <Input {...register('lastName')} id='lastName' />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='username'>Username</Label>
                  <Input {...register('username')} id='username' />
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='gender'>Gender</Label>
                  <Select
                    onValueChange={value => {
                      setValue('gender', value)
                      setIsChanged(true)
                    }}
                    defaultValue={currentUser?.gender}
                    {...register('gender')}>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a gender' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='Male'>Male</SelectItem>
                      <SelectItem value='Female'>Female</SelectItem>
                      <SelectItem
                        onChange={() => setIsChanged(false)}
                        value={null}>
                        Dont want say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='bio'>Bio</Label>
                  <Textarea
                    {...register('bio')}
                    id='bio'
                    placeholder='Type your message here.'
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={!isChanged && !formState.isDirty}
                  type='submit'>
                  Save changes
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <ChangePasswordTab value={'password'} />
      </Tabs>
    </section>
  )
}

export default SettingsTabs
