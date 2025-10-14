'use server'

import bcrypt from 'bcrypt'
import { prisma } from '../prisma'
import { checkUser } from '../userCheck'

interface Passwords {
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

export const changePassword = async (data: Passwords) => {
  const { user } = await checkUser()

  if (user.email === process.env.DEMO_USER_EMAIL) return // demo user protection

  const { currentPassword, newPassword } = data

  if (user.password) {
    const correctCurrentPassword = await bcrypt.compare(
      currentPassword,
      user.password,
    )

    if (!correctCurrentPassword) return { error: 'Incorrect current password!' }
  }

  const newEncryptedPassword = await bcrypt.hash(newPassword, 10)

  const updated = await prisma.user.update({
    where: { id: user.id },
    data: { password: newEncryptedPassword },
  })

  if (!updated) return { error: 'Failed to change password.' }
}
