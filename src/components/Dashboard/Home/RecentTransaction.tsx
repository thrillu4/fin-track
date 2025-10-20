import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'
import { ArrowRightLeft, DollarSignIcon } from 'lucide-react'

const RecentTransaction = async () => {
  const { email } = await checkUser()

  const transaction = await prisma.user.findUnique({
    where: { email },
    select: {
      transactions: { take: 3 },
    },
  })
  return (
    <div className="bg-background flex flex-col gap-2.5 rounded-3xl py-4 sm:p-6">
      {transaction?.transactions.length === 0 ? (
        <Empty className="md:p-3">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ArrowRightLeft />
            </EmptyMedia>
            <EmptyTitle>
              Information about your latest transactions will be posted here.
            </EmptyTitle>
            <EmptyDescription>Add credit card first</EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        transaction?.transactions.map(trans => (
          <div key={trans.id} className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`${trans.category === 'Entertainment' ? 'bg-[var(--chart-3)]' : trans.category === 'Shopping' ? 'bg-[var(--chart-4)]' : trans.category === 'Food' ? 'bg-[var(--chart-2)]' : trans.category === 'Transport' ? 'bg-[var(--chart-1)]' : 'bg-[var(--chart-5)]'} flex items-center justify-center rounded-full p-3.5`}
              >
                <Avatar>
                  <AvatarImage
                    alt={trans.type || 'logo'}
                    width={25}
                    height={25}
                    src={`/dash/transactions/${trans.category}.png`}
                  />
                  <AvatarFallback className="bg-transparent text-black">
                    <DollarSignIcon />
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <div>{trans.description}</div>
                <div className="opacity-60">
                  {trans.date.toLocaleDateString()}
                </div>
              </div>
            </div>
            <div
              className={`${trans.type === 'income' ? 'text-green-500' : 'text-red-500'} font-medium`}
            >
              {trans.type === 'income'
                ? `+$${trans.amount}`
                : `-$${trans.amount}`}
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default RecentTransaction
