import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Eye } from 'lucide-react'
import { EyeOff } from 'lucide-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import { useRegister } from '@/hooks/AuthHooks'

const FormSchema = z.object({
  username: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string()
})

const RegisterForm = () => {
  const navigate = useNavigate()
  const [passwordVisible, setPasswordVisible] = useState(false)
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    }
  })
  const { mutate } = useRegister()

  function onSubmit(data) {
    console.log(data)
    mutate(data)
  }

  const redirectToGoogleAuth = async () => {
    const response = await api.get('/auth/google')
    const { url } = response.data
    window.location.href = url
  }

  const handleClick = () => {
    redirectToGoogleAuth()
  }
  return (
    <>
      <Form {...form}>
        <>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:w-6/12 w-10/12 lg:w-3/12 bg-background space-y-6 border border-primary-foreground py-[35px] px-[12px]  rounded-lg'>
            <div className='flex-col flex justify-center items-center'>
              <div className='w-2/12 object-cover bg-primary bg-white border-primary border p-2 rounded-md '>
                <LazyLoadImage
                  className='w-full'
                  alt='WeShareLogo'
                  src='https://img.icons8.com/ios/250/000000/share-2.png'
                />
              </div>
              <h3 className='text-lg pt-4 pb-3 lg:text-[22px] text-center font-bold'>
                Sign Up to Join WeShare
              </h3>
              <p className='text-sm'>Please enter your details to sing up</p>
              <div>
                <button
                  type='button'
                  onClick={handleClick}
                  className='px-8 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 mt-4 dark:hover:text-slate-300 hover:shadow transition duration-150'>
                  <LazyLoadImage
                    className='w-6 h-6'
                    src='https://www.svgrepo.com/show/475656/google-color.svg'
                    alt='googleLogo'
                  />
                </button>
              </div>
            </div>
            <span className='!mt-3 text-center w-full flex justify-center items-center after:content-[""] after:bg-secondary after:w-full after:h-[1.3px] before:content-[""] before:bg-secondary before:w-full before:h-[1.3px] before:mt-[3px] gap-2 text-muted-foreground after:mt-[3px]'>
              or
            </span>
            <div className='flex items-center gap-6'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder='First Name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Last Name...' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder='Username...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='Email...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='Password'
                        {...field}
                      />
                      <button
                        type='button'
                        className='absolute inset-y-0 right-0 pr-3 flex items-center'
                        onClick={() => setPasswordVisible(!passwordVisible)}>
                        {passwordVisible ? <Eye /> : <EyeOff />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <div className='flex justify-between'>
              <FormField
                control={form.control}
                name='rememberMe'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className='space-y-1 leading-none'>
                      <FormLabel>Remember Me</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              <Link
                type='button'
                className='text-sm border-b pb-[1px] border-primary'
                to={'/forgetPassword'}>
                Forget Password
              </Link>
            </div> */}
            <Button variant='secondary' className='w-full' type='submit'>
              Register
            </Button>
            <p className='text-center text-sm'>
              Are you already have account?
              <Link to={'/Auth/Login'} className='text-md font-medium ml-2'>
                Sign In
              </Link>
            </p>
          </form>
        </>
      </Form>
    </>
  )
}

export default RegisterForm
