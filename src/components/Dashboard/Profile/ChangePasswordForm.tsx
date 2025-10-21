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
import { changePassword } from '@/lib/actions/changePassword'
import { ChangePasswordSchema, ChangePasswordType } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import { Eye, EyeOff } from 'lucide-react'

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState({
    curr: 'password',
    new: 'password',
    conf: 'password',
  })

  const form = useForm<ChangePasswordType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  })

  async function onSubmit(data: ChangePasswordType) {
    setLoading(true)
    console.log('Form submitted:', data)
    const res = await changePassword(data)

    if (res?.error) {
      setError(res.error)
      setLoading(false)
      return
    }

    form.reset()
    toast.success('Password changed successfully!')
    setLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-xl space-y-6 p-4"
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="currentPassword">Current Password</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword.curr}
                    id="currentPassword"
                    placeholder="********"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="Show Password"
                      title={
                        showPassword.curr === 'password'
                          ? 'Show Password'
                          : 'Hide Password'
                      }
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          curr:
                            showPassword.curr === 'text' ? 'password' : 'text',
                        })
                      }}
                    >
                      {showPassword.curr === 'password' ? <Eye /> : <EyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="newPassword">New Password</FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword.new}
                    id="newPassword"
                    placeholder="********"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="Show Password"
                      title={
                        showPassword.new === 'password'
                          ? 'Show Password'
                          : 'Hide Password'
                      }
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          new:
                            showPassword.new === 'text' ? 'password' : 'text',
                        })
                      }}
                    >
                      {showPassword.new === 'password' ? <Eye /> : <EyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmNewPassword">
                Confirm New Password
              </FormLabel>
              <FormControl>
                <InputGroup>
                  <InputGroupInput
                    type={showPassword.conf}
                    id="confirmNewPassword"
                    placeholder="********"
                    {...field}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      aria-label="Show Password"
                      title={
                        showPassword.conf === 'password'
                          ? 'Show Password'
                          : 'Hide Password'
                      }
                      onClick={() => {
                        setShowPassword({
                          ...showPassword,
                          conf:
                            showPassword.conf === 'text' ? 'password' : 'text',
                        })
                      }}
                    >
                      {showPassword.conf === 'password' ? <Eye /> : <EyeOff />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && <p className="text-destructive text-sm">{error}</p>}
        <Button type="submit" disabled={!form.formState.isDirty}>
          {loading ? 'Changing...' : 'Change Password'}
        </Button>
      </form>
    </Form>
  )
}

export default ChangePasswordForm
