import z from 'zod'

export const signInSchema = z.object({
  email: z.email('Enter valid email').min(3, 'Enter valid email'),
  password: z
    .string('Password is required')
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = signInSchema.extend({
  name: z.string('Name is required').min(2, 'At least 2 characters'),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

export const AddCardFormSchema = z.object({
  type: z.enum(['Debit', 'Credit'], {
    error: 'Enter Debit or Credit',
  }),
  name: z.string('Card Holder name is required!').min(6),
  number: z
    .string('Please enter your card number')
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiration: z
    .string('Please fill this field')
    .regex(/^\d{4}$/, 'Card number must be 4 digits'),
  brand: z.enum(['Visa', 'MasterCard'], {
    error: 'Enter Visa or MasterCard',
  }),
})

export type AddCardFormValues = z.infer<typeof AddCardFormSchema>
