'use server'

import { prisma } from '@/lib/prisma'
import { checkUser } from '../userCheck'

export async function getMonthlyExpenses() {
  const { email } = await checkUser()

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)

  const transactions = await prisma.user.findUnique({
    where: { email },
    select: {
      transactions: {
        where: {
          type: 'expense',
          date: {
            gte: sixMonthsAgo,
          },
        },
        select: {
          amount: true,
          date: true,
        },
        orderBy: {
          date: 'asc',
        },
      },
    },
  })

  const monthlyData = transactions?.transactions.reduce(
    (acc, transaction) => {
      const monthKey = transaction.date.toLocaleString('en-US', {
        month: 'long',
      })

      if (!acc[monthKey]) {
        acc[monthKey] = 0
      }

      acc[monthKey] += transaction.amount

      return acc
    },
    {} as Record<string, number>,
  )

  const chartData = Object.entries(monthlyData ?? {}).map(
    ([month, expense]) => ({
      month,
      expense: Math.round(expense * 100) / 100,
    }),
  )

  return chartData
}
