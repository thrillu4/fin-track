'use server'

import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'

interface MonthlyBalance {
  month: string
  income: number
}

export async function getBalanceHistory() {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  const email = session.user.email

  const sixMonthsAgo = new Date()
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6)
  sixMonthsAgo.setDate(1)
  sixMonthsAgo.setHours(0, 0, 0, 0)

  const transactions = await prisma.user.findUnique({
    where: { email },
    select: {
      transactions: {
        where: {
          date: {
            gte: sixMonthsAgo,
          },
          type: 'income',
        },
        orderBy: {
          date: 'asc',
        },
        select: {
          date: true,
          amount: true,
        },
      },
    },
  })

  const monthlyMap = new Map<string, number>()

  for (let i = 5; i >= 0; i--) {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    const monthKey = date.toLocaleString('en-US', { month: 'long' })
    monthlyMap.set(monthKey, 0)
  }

  transactions?.transactions.forEach(transaction => {
    const monthKey = transaction.date.toLocaleString('en-US', { month: 'long' })

    if (monthlyMap.has(monthKey)) {
      const currentIncome = monthlyMap.get(monthKey)!
      monthlyMap.set(monthKey, currentIncome + transaction.amount)
    }
  })

  const chartData: MonthlyBalance[] = []

  monthlyMap.forEach((income, month) => {
    chartData.push({
      month,
      income,
    })
  })

  return chartData
}
