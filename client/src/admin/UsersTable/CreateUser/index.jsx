import Heading from '@/admin/Heading'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { api } from '@/services/api'
import { useCreateUser, useUpdateUser } from '@/hooks/UsersHooks'
import { toast } from 'sonner'

const formSchema = z.object({
  firstName: z
    .string()
    .min(3, { message: 'First Name must be at least 3 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'Last Name must be at least 3 characters' }),
  username: z
    .string()
    .min(3, { message: 'Last Name must be at least 3 characters' }),
  role: z.string(),
  password: z
    .string()
    .optional()
    .refine(value => value.length >= 8 || value === '', {
      message: 'Password must be at least 8 characters'
    }),
  email: z.string().email({ message: 'Invalid email address' })
})

const UserForm = ({ initialData }) => {
  const [loading, setLoading] = useState(false)
  const action = initialData ? 'Save changes' : 'Create'
  const title = initialData ? 'Edit User' : 'Create User'
  const createMutation = useCreateUser()
  const updateMutation = useUpdateUser(initialData?._id)
  const navigate = useNavigate()
  const description = initialData
    ? 'Update a user Add a new user'
    : 'Add a new user'

  const defaultValues = initialData
    ? initialData
    : {
        firstName: '',
        lastName: '',
        username: '',
        role: '',
        password: '',
        email: ''
      }

  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async data => {
    try {
      setLoading(true)
      if (initialData) {
        await updateMutation.mutateAsync(data)
      } else {
        console.log(data)
        await createMutation.mutateAsync(data)
      }
      navigate(`/Admin/Users`)
    } catch (error) {
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <section>
      <div className='mb-4'>
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <div className='mt-8'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8 w-full'>
            <div className='md:grid md:grid-cols-3 gap-8'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='First Name'
                        {...field}
                      />
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
                      <Input
                        disabled={loading}
                        placeholder='Last Name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Username'
                        {...field}
                      />
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
                      <Input
                        disabled={loading}
                        placeholder='Password'
                        {...field}
                      />
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
                      <Input
                        disabled={loading}
                        placeholder='Email Address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder='Select a Role'
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='Admin'>Admin</SelectItem>
                        <SelectItem value='User'>User</SelectItem>
                        <SelectItem value='superAdmin'>SuperAdmin</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type='submit' disabled={loading} className='ml-auto'>
              {action}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default UserForm
