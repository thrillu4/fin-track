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
import { Textarea } from '@/components/ui/textarea'
import { ContactFormSchema, ContactFormType } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const ContactForm = ({
  email,
  name,
}: {
  email: string
  name: string | null
}) => {
  const [loading, setLoading] = useState(false)
  const form = useForm<ContactFormType>({
    resolver: zodResolver(ContactFormSchema),
    defaultValues: {
      email: email || '',
      message: '',
      name: name || '',
    },
  })

  function onSubmit() {
    setLoading(true)
    setTimeout(() => {
      toast.success(
        'Your message has been sent successfully! We will contact you shortly.',
      )
      form.reset()
      setLoading(false)
    }, 1000)
  }
  return (
    <Form {...form}>
      <h3 className="text-primary mt-10 mb-4 text-2xl font-bold sm:text-3xl">
        We&apos;d love to help
      </h3>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormDescription>
                By default, the name is taken from your user profile, if
                specified.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email address" {...field} />
              </FormControl>
              <FormDescription>
                This email address will be used as the reply-to address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Textarea
                  className="max-h-100 resize-y"
                  placeholder="Write your problem or question here"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button
            disabled={!form.formState.isDirty}
            className="w-full max-w-40"
            type="submit"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ContactForm
