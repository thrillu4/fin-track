import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'
import { Captions } from 'lucide-react'
import Image from 'next/image'

const InvoicesSent = async () => {
  const { email } = await checkUser()

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      invoices: { take: 4 },
    },
  })
  const colors = ['#aee9c9', '#f8f2d2', '#a8baee', '#e5a8f1']

  return (
    <div className="bg-sidebar flex flex-col gap-6 rounded-3xl px-6 py-8">
      {user?.invoices.length === 0 && (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Captions />
            </EmptyMedia>
            <EmptyTitle>No data</EmptyTitle>
            <EmptyDescription>Invoices not found</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}
      {user?.invoices.map((inv, i) => (
        <div key={i} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              style={{
                backgroundColor: colors[i],
              }}
              className={`flex items-center justify-center rounded-full p-3.5`}
            >
              <Image
                src={'/dash/invoices/user.png'}
                alt={'user'}
                width={25}
                height={25}
              />
            </div>
            <div>
              <div>{inv.receiver}</div>
              <div className="opacity-60">
                {inv.dueDate.toLocaleDateString()}
              </div>
            </div>
          </div>
          <div>${inv.amount}</div>
        </div>
      ))}
    </div>
  )
}

export default InvoicesSent
