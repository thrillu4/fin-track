'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { register } from '@/lib/actions/auth'
import { ROUTES } from '@/lib/routes'
import { signUpSchema, SignUpSchema } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { HatGlasses } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import DemoUserButton from '../Landing/DemoUserButton'
import GitHubProviderButton from './GitHubProviderButton'

const RegisterForm = () => {
  const [loading, setLoading] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const form = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: SignUpSchema) {
    setLoading(true)
    const formData = new FormData()
    formData.set('name', values.name)
    formData.set('email', values.email)
    formData.set('password', values.password)

    const response = await register(formData)

    if (response.error) {
      setServerError(response.error)
      setLoading(false)
    } else {
      await signIn('credentials', {
        email: values.email,
        password: values.password,
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">
            Welcome to <span className="text-indigo-600">FinTracker</span>
          </h1>
          <p className="text-muted-foreground text-sm text-balance">
            Register to create your first account and start tracking your
            finances.
          </p>
        </div>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
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
                <Input placeholder="Your email address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        <Button
          type="submit"
          className="cursor-pointer bg-indigo-600 hover:bg-indigo-600/70 dark:text-white"
        >
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </form>
      <div className="mt-6 space-y-6">
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <GitHubProviderButton>Continue with GitHub</GitHubProviderButton>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue as Demo User
          </span>
        </div>
        <DemoUserButton classname="w-full cursor-pointer">
          <HatGlasses /> Try Demo
        </DemoUserButton>
        <div className="text-center text-sm">
          Already have an account?{' '}
          <Link href={ROUTES.SIGN_IN} className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </div>
    </Form>
  )
}

export default RegisterForm
