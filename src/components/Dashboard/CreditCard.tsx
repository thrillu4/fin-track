import Image from 'next/image'

const CreditCard = () => {
  const info = {
    number: '1234 5678 9012 3456',
    expiry: '12/26',
    cvv: '123',
    name: 'John Doe',
    balance: '5,000.00',
    bank: 'Bank of America',
    cardType: 'Visa',
  }

  const hiddenNumber =
    info.number.slice(0, 4) +
    info.number.slice(4, -4).replace(/\d/g, '*') +
    info.number.slice(-4)
  return (
    <div className="bg-primary flex w-full max-w-sm flex-col gap-9 rounded-3xl p-6 tracking-widest text-white">
      <div className="flex items-center justify-between">
        <div>
          <div className="opacity-70">Balance</div>
          <div className="text-2xl">${info.balance}</div>
        </div>
        <Image src={'/dash/emv.png'} alt="emv chip" width={34} height={34} />
      </div>
      <div className="flex items-center gap-20">
        <div>
          <div className="opacity-70">Card Holder</div>
          <div className="font-medium">{info.name}</div>
        </div>
        <div>
          <div className="opacity-70">Expiry</div>
          <div className="font-medium">{info.expiry}</div>
        </div>
      </div>
      <div className="flex items-center justify-between border-t pt-6">
        <div className="text-[22px] font-bold">{hiddenNumber}</div>
        {info.cardType === 'Visa' ? (
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

export default CreditCard
