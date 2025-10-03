'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'

const QuickTransfer = () => {
  const [picked, setPicked] = useState<number | null>(null)

  const transfers = [
    {
      id: 1,
      name: 'Livia Bator',
      descr: 'CEO',
      src: '/dash/transfers/1.png',
    },
    {
      id: 2,

      name: 'Rendy Press',
      descr: 'Manager',
      src: '/dash/transfers/2.png',
    },
    {
      id: 3,

      name: 'Fred Bart',
      descr: 'Designer',
      src: '/dash/transfers/3.png',
    },
    {
      id: 4,

      name: 'Linda Gram',
      descr: 'Director',
      src: '/dash/transfers/4.png',
    },
  ]
  return (
    <div className="mr-5 py-9 pr-6 pl-1">
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="ml-2">
          {transfers.map(item => (
            <CarouselItem
              key={item.id}
              className={`${picked === item.id ? 'border-primary rounded-2xl border-4' : 'border-4 border-transparent'} flex cursor-pointer flex-col items-center justify-center gap-4 py-2 pl-0 select-none md:basis-1/2 lg:basis-1/3`}
              onClick={() =>
                item.id === picked ? setPicked(null) : setPicked(item.id)
              }
            >
              <Image src={item.src} alt="Avatar" width={70} height={70} />
              <div className="text-center">
                <div>{item.name}</div>
                <div className="opacity-60">{item.descr}</div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="-right-10" />
      </Carousel>
      <form className="mt-8 flex items-center justify-between">
        <div className="opacity-60">Write Amount</div>
        <div className="flex max-w-[260px]">
          <Input
            className="rounded-l-full px-6"
            type="number"
            placeholder="524.25 $"
          />
          <Button
            type="submit"
            disabled={!picked}
            className="rounded-r-full !px-6"
          >
            Send <Send />
          </Button>
        </div>
      </form>
    </div>
  )
}

export default QuickTransfer
