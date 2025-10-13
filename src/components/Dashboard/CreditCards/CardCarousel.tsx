import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import CreditCard from '../CreditCard'

const CardCarousel = ({ take }: { take: number }) => {
  return (
    <Carousel>
      <CarouselContent className="w-full">
        <CreditCard take={take} />
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

export default CardCarousel
