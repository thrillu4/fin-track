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
    <div className="flex max-h-[235px] flex-wrap items-center gap-x-3 gap-y-8 overflow-hidden md:max-h-[265px] lg:gap-x-8 lg:gap-y-8">
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
              className="bg-primary flex max-h-[265px] w-full max-w-[270px] flex-col gap-y-6 rounded-3xl p-5 tracking-widest text-white sm:max-w-[300px] sm:justify-between sm:p-6 md:max-w-[350px]"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-70 md:text-base">Balance</div>
                  <div className="md:text-xl">${card.balance}</div>
                </div>
                <Image
                  src={'/dash/emv.png'}
                  alt="emv chip"
                  width={34}
                  height={34}
                />
              </div>
              <div className="flex items-center gap-14 sm:gap-20">
                <div>
                  <div className="text-xs opacity-70 md:text-base">
                    Card Holder
                  </div>
                  <div className="text-sm font-medium md:text-base">
                    {user.name}
                  </div>
                </div>
                <div>
                  <div className="text-xs opacity-70 md:text-base">Expiry</div>
                  <div className="text-sm font-medium md:text-base">{`${card.expiryMonth}/${card.expiryYear.toString().slice(-2)}`}</div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t-2 pt-4">
                <div className="font-bold md:text-[22px]">{hiddenNumber}</div>
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
