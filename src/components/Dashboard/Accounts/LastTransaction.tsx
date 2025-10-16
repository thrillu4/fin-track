import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'
import Image from 'next/image'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { DollarSign } from 'lucide-react'

const LastTransaction = async () => {
  const { email } = await checkUser()

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      cards: { take: 1 },
      transactions: {
        orderBy: {
          date: 'desc',
        },
        take: 3,
      },
    },
  })

  return (
    <div className="bg-sidebar flex min-h-[235px] flex-col gap-3 rounded-3xl p-5">
      {user?.transactions.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <DollarSign />
            </EmptyMedia>
            <EmptyTitle>No data</EmptyTitle>
            <EmptyDescription>
              Your latest transitions were not found
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {user?.transactions.map(item => (
        <div
          key={item.id}
          className="grid grid-cols-4 items-center justify-center text-center"
        >
          <div className="flex items-center gap-4 text-left">
            <div
              className={`${item.category === 'Entertainment' ? 'bg-[var(--chart-3)]' : item.category === 'Shopping' ? 'bg-[var(--chart-4)]' : item.category === 'Food' ? 'bg-[var(--chart-2)]' : item.category === 'Investment' ? 'bg-[var(--chart-1)]' : 'bg-[var(--chart-5)]'} flex items-center justify-center rounded-full p-3.5`}
            >
              <Image
                src={
                  item.category === 'Transport'
                    ? '/dash/transactions/Transport.png'
                    : item.category === 'Food'
                      ? '/dash/transactions/Food.png'
                      : item.category === 'Shopping'
                        ? '/dash/transactions/Shopping.png'
                        : item.category === 'Entertainment'
                          ? '/dash/transactions/Entertainment.png'
                          : item.category === 'Investment'
                            ? '/dash/transactions/Investment.png'
                            : item.category === 'Salary'
                              ? '/dash/transactions/Salary.png'
                              : '/dash/transactions/service.png'
                }
                alt={item.category || 'logo'}
                width={25}
                height={25}
              />
            </div>
            <div>
              <div>{item.description}</div>
              <div className="opacity-60">{item.date.toLocaleDateString()}</div>
            </div>
          </div>
          <div>{item.category}</div>
          <div>{user.cards[0].cardNumber.slice(-8, -4) + ' ' + '****'}</div>
          <div
            className={`${item.type === 'income' ? 'text-green-500' : 'text-red-500'} font-medium`}
          >
            {item.type === 'income'
              ? `$${item.amount.toFixed(2)}`
              : item.type === 'expense'
                ? `-$${item.amount.toFixed(2)}`
                : `-$${item.amount.toFixed(2)}`}
          </div>
        </div>
      ))}
    </div>
  )
}

export default LastTransaction
