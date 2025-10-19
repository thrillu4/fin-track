import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'
import CardLayout from './CardLayout'

const CardCarousel = async () => {
  const { user } = await checkUser()

  const cards = await prisma.card.findMany({
    where: { userId: user.id },
  })
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
