import z from 'zod'

export const signInSchema = z.object({
  email: z.email('Invalid email').min(1, 'Email is required'),
  password: z
    .string('Password is required')
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = signInSchema.extend({
  name: z.string('Name is required').min(2, 'Name is required'),
})

export type SignUpSchema = z.infer<typeof signUpSchema>
