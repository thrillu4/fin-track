import CreditCard from '@/components/Dashboard/CreditCard'
import { DebitCredit } from '@/components/Dashboard/DebitCredit'
import FlexRowTabs from '@/components/Dashboard/FlexRowTabs'
import InvoicesSent from '@/components/Dashboard/InvoicesSent'
import LastTransaction from '@/components/Dashboard/LastTransaction'
import { Button } from '@/components/ui/button'

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
        <FlexRowTabs data={accounts} />
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
          <CreditCard take={1} />
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
