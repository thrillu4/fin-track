'use server'

import { prisma } from '../prisma'

export const deleteLoan = async (id: string) => {
  await prisma.loan.delete({ where: { id } })
  return true
}

export const repayLoan = async (id: string) => {
  await prisma.loan.update({
    where: { id },
    data: { status: 'paid', balance: 0 },
  })
  return true
}
