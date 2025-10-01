'use server'

import { signOut } from '@/auth'
import bcrypt from 'bcrypt'
import { prisma } from '../prisma'
import { signUpSchema } from '../zod'

export const register = async (formData: FormData) => {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    name: formData.get('name'),
  }
  const parsed = signUpSchema.safeParse(data)

  if (!parsed.success) {
    return { error: 'Invalid input data' }
  }
  const { email, password, name } = parsed.data

  const existingUser = await prisma.user.findUnique({
    where: { email },
  })
  if (existingUser) {
    return { error: 'User with this email already exists' }
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  })

  if (!user) {
    return { error: 'User registration failed' }
  }
}

export const logout = async () => {
  await signOut()
}
