'use server'

import { prisma } from '../prisma'
import { checkUser } from '../userCheck'

export const getYearlyInvestment = async () => {
  const { user } = await checkUser()

  const investments = await prisma.investment.findMany({
    where: {
      userId: user.id,
      currency: 'USD',
    },
    select: {
      amountInvested: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  })

  const yearlyMap: Record<string, number> = {}

  investments.forEach(inv => {
    const year = inv.createdAt.getFullYear().toString()
    yearlyMap[year] = (yearlyMap[year] || 0) + inv.amountInvested
  })

  const chartData = Object.entries(yearlyMap).map(([year, investment]) => ({
    year,
    investment,
  }))

  return chartData
}
