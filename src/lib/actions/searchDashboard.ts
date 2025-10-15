'use server'

import { prisma } from '@/lib/prisma'
import { ROUTES } from '../routes'
import { checkUser } from '../userCheck'

export async function searchDashboard() {
  const { user } = await checkUser()

  const pages = [
    { label: 'Dashboard', url: ROUTES.DASHBOARD },
    { label: 'Transactions', url: ROUTES.TRANSACTIONS },
    { label: 'Accounts', url: ROUTES.ACCOUNTS },
    { label: 'Credit Cards', url: ROUTES.CREDIT_CARDS },
    { label: 'Investments', url: ROUTES.INVESTMENTS },
    { label: 'Loans', url: ROUTES.LOANS },
    { label: 'Profile', url: ROUTES.PROFILE },
    { label: 'Help', url: ROUTES.HELP },
  ]

  const transactions = await prisma.transaction.findMany({
    where: {
      userId: user.id,
    },
    take: 5,
  })

  const accounts = await prisma.userAccount.findMany({
    where: {
      userId: user.id,
    },
    take: 5,
  })

  const cards = await prisma.card.findMany({
    where: { userId: user.id },
    take: 5,
  })

  const investments = await prisma.investment.findMany({
    where: { userId: user.id },
    take: 5,
  })

  const loans = await prisma.loan.findMany({
    where: {
      userId: user.id,
    },
    take: 5,
  })

  return { pages, transactions, accounts, cards, investments, loans }
}
