import { auth } from '@/auth'
import { prisma } from './prisma'

export const checkUser = async () => {
  const session = await auth()

  if (!session?.user?.email) throw new Error('401 Unauthorized!')

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) throw new Error('User not found!')

  return { email, user }
}
