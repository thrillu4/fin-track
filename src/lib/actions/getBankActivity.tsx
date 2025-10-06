'use server'
import { auth } from '@/auth'
import { prisma } from '../prisma'

interface ChartDataPoint {
  date: string
  income: number
  expenses: number
}

export async function getBankActivityData(days: number = 90) {
  const session = await auth()

  if (!session?.user?.email) {
    throw new Error('Unauthorized')
  }

  const email = session.user.email

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)
  startDate.setHours(0, 0, 0, 0)

  const transactions = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      transactions: {
        where: {
          date: {
            gte: startDate,
          },
        },
        orderBy: {
          date: 'asc',
        },
        select: {
          date: true,
          type: true,
          amount: true,
        },
      },
    },
  })

  const dataMap = new Map<string, { income: number; expenses: number }>()

  transactions?.transactions.forEach(transaction => {
    const dateKey = transaction.date.toISOString().split('T')[0]

    if (!dataMap.has(dateKey)) {
      dataMap.set(dateKey, { income: 0, expenses: 0 })
    }

    const dayData = dataMap.get(dateKey)!

    if (transaction.type === 'income') {
      dayData.income += transaction.amount
    } else if (transaction.type === 'expense') {
      dayData.expenses += transaction.amount
    }
  })

  const chartData: ChartDataPoint[] = Array.from(dataMap.entries())
    .map(([date, data]) => ({
      date,
      income: data.income,
      expenses: data.expenses,
    }))
    .sort((a, b) => a.date.localeCompare(b.date))

  return chartData
}
