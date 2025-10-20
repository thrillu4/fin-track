import { auth } from '@/auth'
import { prisma } from './prisma'
import { redirect } from 'next/navigation'
import { ROUTES } from './routes'

export const checkUser = async () => {
  const session = await auth()

  if (!session?.user?.email) redirect(ROUTES.SIGN_IN)

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) redirect(ROUTES.SIGN_IN)

  return { email, user }
}
