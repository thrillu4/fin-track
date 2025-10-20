import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { ROUTES } from '@/lib/routes'
import { CreditCardIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'
import CardLayout from './CreditCards/CardLayout'

const CreditCard = async ({ take }: { take: number }) => {
  const { user } = await checkUser()

  const cards = await prisma.card.findMany({
    where: { userId: user.id },
    take,
  })

  return (
    <div className="flex max-h-[235px] flex-wrap items-center gap-x-3 gap-y-8 overflow-hidden md:h-full md:max-h-[265px] lg:gap-x-8 lg:gap-y-8">
      {cards.length === 0 ? (
        <Empty className="max-h-[235px] w-full border border-dashed">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <CreditCardIcon />
            </EmptyMedia>
            <EmptyTitle>You don&apos;t have any credit cards yet</EmptyTitle>
            <EmptyDescription>
              Add credit cards to your profile to track bank activity
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Link href={`${ROUTES.CREDIT_CARDS}/#add-new-card`}>
              <Button variant="outline" size="sm">
                Add Card
              </Button>
            </Link>
          </EmptyContent>
        </Empty>
      ) : (
        cards.map(card => (
          <CardLayout key={card.id} card={card} userName={user.name} />
        ))
      )}
    </div>
  )
}

export default CreditCard
