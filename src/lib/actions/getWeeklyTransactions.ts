// app/actions/transactions.ts
'use server'

import { prisma } from '@/lib/prisma'
import { endOfWeek, format, startOfWeek } from 'date-fns'
import { eachDayOfInterval } from 'date-fns/eachDayOfInterval'
import { checkUser } from '../userCheck'

export type ChartData = {
  day: string
  debit: number
  credit: number
}

export type WeeklyData = {
  chartData: ChartData[]
  totalDebit: number
  totalCredit: number
  weekStart: string
  weekEnd: string
}

export async function getWeeklyTransactions(
  weekOffset: number = 0,
): Promise<WeeklyData> {
  try {
    const { user } = await checkUser()

    const recentTransactions = await prisma.transaction.findMany({
      where: {
        userId: user.id,
      },
      include: {
        card: true,
      },
      orderBy: {
        date: 'desc',
      },
      take: 50,
    })

    if (recentTransactions.length === 0) {
      const today = new Date()
      const weekStart = startOfWeek(today, { weekStartsOn: 1 })
      const weekEnd = endOfWeek(today, { weekStartsOn: 1 })
      const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

      return {
        chartData: daysOfWeek.map(date => ({
          day: format(date, 'EEEE'),
          debit: 0,
          credit: 0,
        })),
        totalDebit: 0,
        totalCredit: 0,
        weekStart: format(weekStart, 'MMM dd, yyyy'),
        weekEnd: format(weekEnd, 'MMM dd, yyyy'),
      }
    }

    const oldestTransaction = recentTransactions[recentTransactions.length - 1]
    const newestTransaction = recentTransactions[0]

    let weekStart: Date
    let weekEnd: Date

    if (weekOffset === 0) {
      weekStart = startOfWeek(new Date(oldestTransaction.date), {
        weekStartsOn: 1,
      })
      weekEnd = endOfWeek(new Date(newestTransaction.date), { weekStartsOn: 1 })
    } else {
      const referenceDate = new Date(newestTransaction.date)
      referenceDate.setDate(referenceDate.getDate() + weekOffset * 7)
      weekStart = startOfWeek(referenceDate, { weekStartsOn: 1 })
      weekEnd = endOfWeek(referenceDate, { weekStartsOn: 1 })
    }

    const transactions = recentTransactions.filter(t => {
      const tDate = new Date(t.date)
      return tDate >= weekStart && tDate <= weekEnd
    })

    const daysOfWeek = eachDayOfInterval({ start: weekStart, end: weekEnd })

    const chartData = daysOfWeek.map(date => {
      const dayName = format(date, 'EEEE')
      const dayTransactions = transactions.filter(
        t =>
          format(new Date(t.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'),
      )

      const debit = dayTransactions
        .filter(
          t =>
            (t.card?.cardType === 'debit' && t.type === 'expense') ||
            (t.type === 'expense' && !t.card),
        )
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

      const credit = dayTransactions
        .filter(
          t =>
            (t.card?.cardType === 'credit' && t.type === 'expense') ||
            t.type === 'income',
        )
        .reduce((sum, t) => sum + Math.abs(t.amount), 0)

      return {
        day: dayName,
        debit: Math.round(debit * 100) / 100,
        credit: Math.round(credit * 100) / 100,
      }
    })

    const totalDebit = chartData.reduce((sum, day) => sum + day.debit, 0)
    const totalCredit = chartData.reduce((sum, day) => sum + day.credit, 0)

    return {
      chartData,
      totalDebit: Math.round(totalDebit * 100) / 100,
      totalCredit: Math.round(totalCredit * 100) / 100,
      weekStart: format(weekStart, 'MMM dd, yyyy'),
      weekEnd: format(weekEnd, 'MMM dd, yyyy'),
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw new Error('Failed to fetch transactions')
  }
}
