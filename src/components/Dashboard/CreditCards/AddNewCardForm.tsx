'use client'
import { AddCardFormSchema, AddCardFormValues } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { createNewCard } from '@/lib/actions/createNewCard'
import { useState } from 'react'
import { toast } from 'sonner'

const AddNewCardForm = () => {
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)
  const form = useForm<AddCardFormValues>({
    resolver: zodResolver(AddCardFormSchema),
    defaultValues: {
      type: 'Credit',
      name: '',
      number: '',
      expiration: '',
      brand: 'Visa',
      cvv: '',
    },
  })

  async function onSubmit(values: AddCardFormValues) {
    setLoading(true)
    const result = await createNewCard(values)

    if (result.error) {
      setServerError(result.error)
      setLoading(false)
    }

    if (result.success) {
      toast.success('Card Successfully Added!', {})
      setLoading(false)
      form.reset()
    }
  }
  return (
    <div className="rounded-3xl bg-[var(--sidebar)] px-4 py-10 sm:px-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mx-auto max-w-sm sm:max-w-full lg:mx-0"
        >
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem className="lg:col-start-1 lg:col-end-4">
                  <FormLabel>Card Number</FormLabel>
                  <FormControl className="flex lg:hidden">
                    <Input
                      placeholder="**** **** **** ****"
                      maxLength={16}
                      {...field}
                    />
                  </FormControl>
                  <FormControl className="hidden lg:flex">
                    <div>
                      <InputOTP {...field} maxLength={16}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                          <InputOTPSlot index={6} />
                          <InputOTPSlot index={7} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={8} />
                          <InputOTPSlot index={9} />
                          <InputOTPSlot index={10} />
                          <InputOTPSlot index={11} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                          <InputOTPSlot index={12} />
                          <InputOTPSlot index={13} />
                          <InputOTPSlot index={14} />
                          <InputOTPSlot index={15} />
                        </InputOTPGroup>
                      </InputOTP>
                    </div>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiration Date</FormLabel>
                  <FormControl>
                    <InputOTP {...field} maxLength={4}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl className="max-w-max">
                    <Input
                      inputMode="numeric"
                      pattern="\d*"
                      placeholder="***"
                      {...field}
                      type="password"
                      maxLength={3}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="">
                  <FormLabel>Card Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Credit" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Holder</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Name" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Brand</FormLabel>
                  <FormControl>
                    <Input placeholder="Visa" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="mt-10 w-full font-semibold lg:w-40 lg:text-lg"
          >
            {loading ? 'Loading...' : 'Add Card'}
          </Button>
          {serverError && (
            <p className="text-destructive pt-2 text-sm">{serverError}</p>
          )}
        </form>
      </Form>
    </div>
  )
}

export default AddNewCardForm
