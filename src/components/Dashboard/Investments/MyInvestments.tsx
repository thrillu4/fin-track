import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'
import { ChartBarDecreasing } from 'lucide-react'
import Image from 'next/image'

const MyInvestments = async () => {
  const { email } = await checkUser()

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      investments: { take: 3 },
    },
  })

  const colors = ['#FFE0EB', '#E7EDFF', '#FFF5D9']

  return (
    <div className="flex flex-col gap-4">
      {user?.investments.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ChartBarDecreasing />
            </EmptyMedia>
            <EmptyTitle>No Data</EmptyTitle>
            <EmptyDescription>
              You don&apos;t have any investments yet
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {user?.investments.map((inv, i) => (
        <div
          key={inv.id}
          className="flex items-center justify-between rounded-3xl bg-[var(--sidebar)] p-4"
        >
          <div className="flex flex-2 items-center gap-5">
            <div
              style={{ backgroundColor: colors[i] }}
              className={`flex items-center justify-center rounded-3xl p-4`}
            >
              <Image
                src={`/dash/investments/${i + 1}.png`}
                alt={inv.type}
                width={26}
                height={26}
              />
            </div>
            <div className="space-y-1">
              <div className="font-medium">{inv.name}</div>
              <div className="text-gray-400">{inv.type}</div>
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <div>${inv.currentValue.toFixed(2)}</div>
            <div className="text-gray-400">Investment Value</div>
          </div>
          <div className="flex-1 space-y-1">
            <div>{inv.profitLoss.toFixed(2)}</div>
            <div className="text-gray-400">Return Value</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyInvestments
