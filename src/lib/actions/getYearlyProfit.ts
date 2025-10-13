'use server'

import { auth } from '@/auth'
import { prisma } from '../prisma'

export const getYearlyProfit = async () => {
  const session = await auth()

  if (!session?.user?.email) throw new Error('Unauthorized')

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) throw new Error('Unauthorized')

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
