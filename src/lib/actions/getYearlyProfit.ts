'use server'

import { prisma } from '../prisma'
import { checkUser } from '../userCheck'

export const getYearlyProfit = async () => {
  const { user } = await checkUser()

  const investments = await prisma.investment.findMany({
    where: {
      userId: user.id,
      currency: 'USD',
    },
    select: {
      profitLoss: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const yearlyMap: Record<string, number> = {}

  investments.forEach(inv => {
    const year = inv.createdAt.getFullYear().toString()
    yearlyMap[year] = (yearlyMap[year] || 0) + inv.profitLoss
  })

  const chartData = Object.entries(yearlyMap).map(([year, profit]) => ({
    year,
    profit,
  }))

  return chartData
}
