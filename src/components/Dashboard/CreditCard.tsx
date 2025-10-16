import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'
import Image from 'next/image'

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

const CreditCard = async ({ take }: { take: number }) => {
  const { email, user } = await checkUser()

  const cards = await prisma.user.findUnique({
    where: { email },
    select: {
      cards: { take },
    },
  })

  return (
    <div className="flex max-h-[235px] flex-wrap items-center gap-8 overflow-hidden">
      {cards?.cards.length === 0 ? (
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
        cards?.cards.map(card => {
          const hiddenNumber =
            card.cardNumber.slice(0, 4) +
            card.cardNumber.slice(4, -4).replace(/\d/g, '*') +
            card.cardNumber.slice(-4)
          return (
            <div
              key={card.id}
              className="bg-primary flex min-h-[235px] w-full max-w-[350px] flex-col justify-between rounded-3xl p-6 tracking-widest text-white"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="opacity-70">Balance</div>
                  <div className="text-xl">${card.balance}</div>
                </div>
                <Image
                  src={'/dash/emv.png'}
                  alt="emv chip"
                  width={34}
                  height={34}
                />
              </div>
              <div className="flex items-center gap-20">
                <div>
                  <div className="opacity-70">Card Holder</div>
                  <div className="font-medium">{user.name}</div>
                </div>
                <div>
                  <div className="opacity-70">Expiry</div>
                  <div className="font-medium">{`${card.expiryMonth}/${card.expiryYear.toString().slice(-2)}`}</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t-2 pt-4">
                <div className="text-[22px] font-bold">{hiddenNumber}</div>
                {card.cardType === 'Visa' ? (
                  <Image
                    src={'/dash/visa.png'}
                    alt="visa"
                    width={40}
                    height={20}
                  />
                ) : (
                  <Image
                    src={'/dash/mastercard.png'}
                    alt="master card"
                    width={40}
                    height={20}
                  />
                )}
              </div>
            </div>
          )
        })
      )}
    </div>
  )
}

export default CreditCard
