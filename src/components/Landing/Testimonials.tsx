import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { testimonials } from '@/lib/fake-data'
import Image from 'next/image'

const Testimonials = () => {
  return (
    <section className="mt-14 py-18">
      <div className="mb-3 text-center font-bold text-blue-600">
        TESTIMONIALS
      </div>
      <h3 className="text-center text-5xl font-bold">
        What world says about us
      </h3>
      <Carousel
        opts={{
          loop: true,
        }}
        className="mt-15 h-full w-full overflow-x-hidden"
      >
        <CarouselContent className="py-10">
          {testimonials.map(test => (
            <CarouselItem key={test.name} className="md:basis-1/2 lg:basis-1/3">
              <Card className="min-h-[450px] cursor-pointer select-none">
                <CardContent className="flex h-full flex-col items-center justify-between gap-12 p-6">
                  <Image
                    src={'/landing/testimonials/up.png'}
                    alt="up-logo"
                    width={25}
                    height={25}
                  />
                  <q className="text-center font-semibold">{test.text}</q>
                  <div className="flex items-center">
                    <div className="relative h-14 w-14">
                      <Image
                        src={test.image}
                        alt={test.name}
                        fill
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <div className="font-bold">{test.name}</div>
                      <div className="text-sm text-gray-500">{test.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

export default Testimonials
