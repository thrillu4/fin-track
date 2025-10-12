'use server'

import { auth } from '@/auth'
import { prisma } from '../prisma'

interface CardFormData {
  brand: 'Visa' | 'MasterCard'
  expiration: string
  name: string
  number: string
  type: 'Credit' | 'Debit'
  cvv: string
}

export const createNewCard = async (obj: CardFormData) => {
  const { brand, expiration, name, number, type, cvv } = obj
  const session = await auth()

  if (!session?.user?.email) throw new Error('Unauthorize')

  if (!brand || !expiration || !name || !number || !type || !cvv) {
    return {
      error: 'Incorrect data information, please check input',
    }
  }

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  })

  if (!user) {
    return { error: 'User not found!' }
  }

  const existingCard = await prisma.card.findUnique({
    where: { cardNumber: number },
  })

  if (existingCard) {
    return { error: 'This Card already added to your account!' }
  }

  await prisma.card.create({
    data: {
      accountId: user.accounts[0].id,
      cardNumber: name,
      cardType: type,
      cvv,
      expiryMonth: Number(expiration.slice(0, 2)),
      expiryYear: 2000 + Number(expiration.slice(2)),
      cardBrand: brand,
      userId: user.id,
    },
  })

  return { success: true }
}
