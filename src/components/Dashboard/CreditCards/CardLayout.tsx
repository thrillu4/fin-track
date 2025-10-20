'use client'
import { Card } from '@prisma/client'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'sonner'

const CardLayout = ({
  card,
  userName,
}: {
  card: Card
  userName: string | null
}) => {
  const [show, setShow] = useState(false)

  const handleShowAndCopyCardNumber = async () => {
    setShow(true)
    await navigator.clipboard.writeText(card.cardNumber)
    toast.success('Card number copied!', { position: 'top-center' })
  }

  const hiddenNumber =
    card.cardNumber.slice(0, 4) +
    card.cardNumber.slice(4, -4).replace(/\d/g, '*') +
    card.cardNumber.slice(-4)
  return (
    <div
      key={card.id}
      className="bg-primary flex h-full max-h-[265px] w-full max-w-[300px] flex-col gap-y-6 rounded-3xl p-5 tracking-widest text-white sm:justify-between sm:p-6 md:max-w-[350px]"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs opacity-70 md:text-base">Balance</div>
          <div className="select-text md:text-xl">${card.balance}</div>
        </div>
        <Image src={'/dash/emv.png'} alt="emv chip" width={34} height={34} />
      </div>
      <div className="flex items-center gap-14 sm:gap-20">
        <div>
          <div className="text-xs opacity-70 md:text-base">Card Holder</div>
          <div className="text-sm font-medium select-text md:text-base">
            {userName || '____ _____'}
          </div>
        </div>
        <div>
          <div className="text-xs opacity-70 md:text-base">Expiry</div>
          <div className="text-sm font-medium select-text md:text-base">{`${card.expiryMonth}/${card.expiryYear.toString().slice(-2)}`}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t-2 pt-4">
        <div
          onClick={handleShowAndCopyCardNumber}
          className="cursor-pointer font-bold md:text-[22px]"
        >
          {show ? card.cardNumber : hiddenNumber}
        </div>
        {card.cardType === 'Visa' ? (
          <Image src={'/dash/visa.png'} alt="visa" width={40} height={20} />
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
}

export default CardLayout
