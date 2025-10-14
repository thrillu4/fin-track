'use server'

import { auth } from '@/auth'
import { revalidatePath } from 'next/cache'
import { prisma } from '../prisma'
import { ROUTES } from '../routes'

export const updateAvatar = async (url: string) => {
  const session = await auth()

  if (!session?.user?.email) throw new Error('Unauthorize')

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
  })
  if (!user) throw new Error('User not found!')

  const updateImage = await prisma.user.update({
    where: { email },
    data: { image: url },
  })

  if (!updateImage) return { error: 'Failed to update avatar!' }

  revalidatePath(ROUTES.PROFILE)
}
