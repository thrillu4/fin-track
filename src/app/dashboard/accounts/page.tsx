import CreditCard from '@/components/Dashboard/CreditCard'
import { DebitCredit } from '@/components/Dashboard/DebitCredit'
import InvoicesSent from '@/components/Dashboard/InvoicesSent'
import LastTransaction from '@/components/Dashboard/LastTransaction'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const Accounts = () => {
  const accounts = [
    {
      src: '/dash/accounts/balance.png',
      title: 'My Balance',
      amount: 12750,
      color: '#FFF5D9',
    },
    {
      src: '/dash/accounts/income.png',
      title: 'Income',
      amount: 5600,
      color: '#E7EDFF',
    },
    {
      src: '/dash/accounts/expense.png',
      title: 'Expense',
      amount: 34680,
      color: '#FFE0EB',
    },
    {
      src: '/dash/accounts/saving.png',
      title: 'Total Saving',
      amount: 79200,
      color: '#DCFAF8',
    },
  ]
  return (
    <>
      <div className="grid w-full grid-cols-6 gap-x-7 gap-y-6 px-10 py-8">
        <div className="bg-sidebar col-span-6 flex items-center justify-between rounded-3xl px-9 py-6 tracking-wide">
          {accounts.map((acc, i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                style={{ backgroundColor: acc.color }}
                className={`flex items-center justify-center rounded-full p-5`}
              >
                <Image src={acc.src} alt={acc.title} width={30} height={30} />
              </div>
              <div>
                <div className="text-gray-500">{acc.title}</div>
                <div className="text-2xl font-bold">
                  ${acc.amount.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-start-1 col-end-5">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Resent Transaction</h3>
          <LastTransaction />
        </div>
        <div className="col-start-5 col-end-7">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-bold">My Cards</h3>
            <Button variant={'link'} className="py-0">
              See All
            </Button>
          </div>
          <div className="flex items-center gap-7">
            <CreditCard />
          </div>
        </div>
        <div className="col-start-1 col-end-5">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">
            Debit & Credit Overview
          </h3>
          <DebitCredit />
        </div>
        <div className="col-start-5 col-end-7">
          <h3 className="mb-6 text-2xl font-bold">Invoices Sent</h3>
          <InvoicesSent />
        </div>
      </div>
    </>
  )
}

export default Accounts
