'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../prisma'
import { ROUTES } from '../routes'
import { checkUser } from '../userCheck'

interface UserData {
  email: string
  name: string
  currency: string
  phone: string
  bio: string
  location?: string | undefined
}

export const editUserData = async (data: UserData) => {
  const { email } = await checkUser()

  await prisma.user.update({
    where: { email },
    data: {
      name: data.name,
      email: data.email,
      profile: {
        upsert: {
          update: {
            fullName: data.name,
            phone: data.phone,
            location: data.location,
            bio: data.bio,
          },
          create: {
            fullName: data.name,
            phone: data.phone,
            location: data.location,
            bio: data.bio,
          },
        },
      },
    },
  })

  revalidatePath(ROUTES.PROFILE)
}
