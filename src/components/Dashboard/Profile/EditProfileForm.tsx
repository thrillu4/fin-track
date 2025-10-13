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
import { EditProfileSchema, EditProfileType } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Profile, User } from '@prisma/client'
import { useForm } from 'react-hook-form'

interface UserAccount extends User {
  profile: Profile | null
}

const EditProfileForm = ({ user }: { user: UserAccount }) => {
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

  function onSubmit(values: EditProfileType) {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-10"
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="example@email.com" {...field} />
              </FormControl>
              <FormDescription>
                This is your public email address.
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
        <div className="col-span-2 flex justify-end">
          <Button
            disabled={!form.formState.isDirty || !form.formState.isValid}
            className="flex w-1/5 rounded-3xl text-lg font-bold"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default EditProfileForm
