'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

export async function getTransactions() {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  const email = session.user.email

  const transactions = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      transactions: {
        include: {
          card: {
            select: {
              cardNumber: true,
            },
          },
          account: {
            select: {
              accountNumber: true,
            },
          },
        },
        orderBy: {
          date: 'desc',
        },
      },
    },
  })

  return transactions?.transactions.map(t => ({
    id: t.id,
    header: t.description || 'Transaction',
    type: t.category || 'Other',
    card: t.card?.cardNumber || t.account?.accountNumber || 'N/A',
    date: t.date.toISOString(),
    amount: t.type === 'income' ? t.amount : -t.amount,
    currency: t.currency,
  }))
}

export async function getTransactionStats() {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  const email = session.user.email

  const transactions = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      transactions: {
        select: {
          amount: true,
          type: true,
        },
      },
    },
  })

  const totalIncome = transactions?.transactions
    ? transactions.transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    : 0

  const totalExpenses = transactions?.transactions
    ? transactions.transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    : 0

  return {
    totalIncome,
    totalExpenses,
    netBalance: totalIncome - totalExpenses,
  }
}
