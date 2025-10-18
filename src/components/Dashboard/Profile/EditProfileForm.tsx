'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { editUserData } from '@/lib/actions/editUserData'
import { EditProfileSchema, EditProfileType } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profile, User } from '@prisma/client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

interface UserAccount extends User {
  profile: Profile | null
}

interface ProfileProps {
  user: UserAccount
  protection: boolean
}

const EditProfileForm = ({ user, protection }: ProfileProps) => {
  const [loading, setLoading] = useState(false)
  const { name, email } = user
  const form = useForm<EditProfileType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      bio: user.profile?.bio || '',
      currency: user.profile?.currency || 'USD',
      email,
      location: user.profile?.location || '',
      name: name || '',
      phone: user.profile?.phone || '',
    },
    mode: 'onChange',
  })

  async function onSubmit(data: EditProfileType) {
    setLoading(true)
    await editUserData(data)
    toast.success('Profile updated successfully!')
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-7 sm:gap-10 lg:grid-cols-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Full Name" {...field} />
              </FormControl>
              <FormDescription>This is your public name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          disabled={protection}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription>
                {protection
                  ? 'You cannot change email address as a demo user '
                  : 'This is your public email address.'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="+23 137815 6720" {...field} />
              </FormControl>
              <FormDescription>
                Your phone number is confidential.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Input placeholder="USD" {...field} />
              </FormControl>
              <FormDescription>
                The tracker currently only supports USD.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Location</FormLabel>
              <FormControl>
                <Input
                  placeholder="Grimmaischer Steinweg, 04103 Leipzig, Germany"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About Yourself</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter something about yourself"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end lg:col-span-2">
          <Button
            disabled={!form.formState.isDirty || !form.formState.isValid}
            className="flex rounded-3xl font-bold"
            type="submit"
          >
            {loading ? 'Changing...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditProfileForm
