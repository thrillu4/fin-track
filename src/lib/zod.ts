import z from 'zod'

export const signInSchema = z.object({
  email: z.email('Enter valid email').min(3, 'Enter valid email'),
  password: z
    .string('Password is required')
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
  name: z
    .string('Card Holder name is required!')
    .min(6, { error: 'Must contain at least 6 characters' }),
  number: z
    .string('Please enter your card number')
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  cvv: z
    .string('CVV is required')
    .length(3, { error: 'Must contain 3 digits' })
    .regex(/^\d+$/, 'Only digits'),
  expiration: z
    .string('Please fill this field')
    .regex(/^\d{4}$/, 'Card number must be 4 digits'),
  brand: z.enum(['Visa', 'MasterCard'], {
    error: 'Enter Visa or MasterCard',
  }),
})

export type AddCardFormValues = z.infer<typeof AddCardFormSchema>

export const EditProfileSchema = z.object({
  email: z.email('Enter valid email'),
  name: z.string().min(3, { error: 'Minimum 3 characters' }),
  currency: z.string('Only USD supported'),
  location: z.string().optional(),
  phone: z.string().min(5, { error: 'Too short for phone number' }),
  bio: z.string().max(100, { error: '100 character max' }),
})

export type EditProfileType = z.infer<typeof EditProfileSchema>

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'Current password must be at least 8 characters'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters'),
    confirmNewPassword: z
      .string()
      .min(8, 'Confirm password must be at least 8 characters'),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: 'Passwords do not match',
    path: ['confirmNewPassword'],
  })

export type ChangePasswordType = z.infer<typeof ChangePasswordSchema>

export const ContactFormSchema = z.object({
  name: z.string().min(3, { error: 'Minimum 3 characters' }),
  email: z.email('Enter valid email'),
  message: z.string().min(5, {
    error: 'Please write your message first, at least 5 characters.',
  }),
})

export type ContactFormType = z.infer<typeof ContactFormSchema>

export const TransferSchema = z.object({
  amount: z.string('Enter the amount').min(1, { error: 'Enter the amount' }),
})

export type TransferType = z.infer<typeof TransferSchema>
