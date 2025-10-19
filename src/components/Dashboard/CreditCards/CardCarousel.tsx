import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { prisma } from '@/lib/prisma'
import { ROUTES } from '@/lib/routes'
import { checkUser } from '@/lib/userCheck'
import { CreditCardIcon } from 'lucide-react'
import Link from 'next/link'
import CardLayout from './CardLayout'

const CardCarousel = async () => {
  const { user } = await checkUser()

  const cards = await prisma.card.findMany({
    where: { userId: user.id },
  })

  if (cards.length === 0) {
    return (
      <Empty className="max-h-[265px] w-full border border-dashed">
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
    )
  }
  return (
    <Carousel>
      <CarouselContent className="flex w-full">
        {cards.map(card => (
          <CarouselItem
            className="min-w-[300px] grow basis-auto select-none md:max-w-[350px]"
            key={card.id}
          >
            <CardLayout card={card} userName={user.name} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default CardCarousel
