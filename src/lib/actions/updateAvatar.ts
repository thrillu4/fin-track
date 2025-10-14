'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../prisma'
import { ROUTES } from '../routes'
import { checkUser } from '../userCheck'

export const updateAvatar = async (url: string) => {
  const { email } = await checkUser()

  const updateImage = await prisma.user.update({
    where: { email },
    data: { image: url },
  })

  if (!updateImage) return { error: 'Failed to update avatar!' }

  revalidatePath(ROUTES.PROFILE)
}
