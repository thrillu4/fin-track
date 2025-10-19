'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
} from '@/components/ui/carousel'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { TransferSchema, TransferType } from '@/lib/zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '../../ui/button'
import { Input } from '../../ui/input'

const QuickTransfer = () => {
  const [picked, setPicked] = useState<number | null>(null)

  const form = useForm<TransferType>({
    resolver: zodResolver(TransferSchema),
    defaultValues: {
      amount: '',
    },
  })

  function onSubmit() {
    if (!picked) {
      toast.error('Select receiver!')
      return
    }
    toast.success('The translation was successful!')
    setPicked(null)
    form.reset()
  }

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
    <div className="py-9 pl-1 sm:mr-5 sm:pr-6">
      <Carousel
        opts={{
          loop: true,
        }}
      >
        <CarouselContent className="ml-2">
          {transfers.map(item => (
            <CarouselItem
              key={item.id}
              className={`${picked === item.id ? 'border-primary rounded-2xl border-4' : 'border-4 border-transparent'} flex basis-[35%] cursor-pointer flex-col items-center justify-center gap-4 py-2 pl-0 select-none md:basis-1/3`}
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
        <CarouselNext className="right-0 sm:-right-10" />
      </Carousel>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-8 flex flex-col items-center justify-between gap-2 sm:flex-row"
        >
          <div className="ml-5 text-sm opacity-60 xl:text-base">
            Write Amount
          </div>

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex max-w-[230px]">
                    <Input
                      className="rounded-l-full pl-6"
                      {...field}
                      type="number"
                      min={0}
                      placeholder="0.00 $"
                      autoComplete="transaction-amount"
                    />
                    <Button type="submit" className="rounded-r-full !px-6">
                      Send <Send />
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}

export default QuickTransfer
