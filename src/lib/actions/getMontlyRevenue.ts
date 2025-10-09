'use server'

import { prisma } from '../prisma'

export const getMonthlyRevenue = async () => {
  const transactions = await prisma.transaction.groupBy({
    by: ['date'],
    where: {
      type: 'income',
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      date: 'asc',
    },
  })

  const chartData = transactions.map(item => ({
    month: new Date(item.date).toLocaleString('default', { month: 'long' }),
    revenue: item._sum.amount ?? 0,
  }))

  return chartData
}
