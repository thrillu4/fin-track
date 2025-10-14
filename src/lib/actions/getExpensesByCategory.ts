'use server'

import { prisma } from '@/lib/prisma'
import { checkUser } from '../userCheck'

interface ExpenseByCategory {
  key: string
  transaction: string
  percent: number
  amount: number
  fill: string
}

const categoryColors: Record<string, string> = {
  Salary: 'var(--chart-1)',
  Food: 'var(--chart-2)',
  Investment: 'var(--chart-3)',
  Shopping: 'var(--chart-4)',
  Transport: 'var(--chart-5)',
  Entertainment: 'var(--credit)',
  other: 'var(--debit)',
}

export async function getExpensesByCategory() {
  const { email } = await checkUser()

  const currentYear = new Date().getFullYear()
  const startDate = new Date(currentYear, 0, 1)
  const endDate = new Date()

  const expenses = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      transactions: {
        where: {
          type: 'expense',
          date: {
            gte: startDate,
            lte: endDate,
          },
        },
        select: {
          category: true,
          amount: true,
        },
      },
    },
  })

  const categoryMap = new Map<string, number>()
  let totalExpenses = 0

  expenses?.transactions.forEach(expense => {
    const category = expense.category || 'other'
    const currentAmount = categoryMap.get(category) || 0
    categoryMap.set(category, currentAmount + expense.amount)
    totalExpenses += expense.amount
  })

  if (totalExpenses === 0) {
    return []
  }

  const chartData: ExpenseByCategory[] = Array.from(categoryMap.entries())
    .map(([category, amount]) => ({
      key: category,
      transaction: category.charAt(0).toUpperCase() + category.slice(1),
      percent: Math.round((amount / totalExpenses) * 100),
      amount,
      fill: categoryColors[category] || 'var(--primary)',
    }))
    .sort((a, b) => b.amount - a.amount)

  return chartData
}
