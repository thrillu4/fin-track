import { DebitCredit } from '@/components/Dashboard/Accounts/DebitCredit'
import InvoicesSent from '@/components/Dashboard/Accounts/InvoicesSent'
import LastTransaction from '@/components/Dashboard/Accounts/LastTransaction'
import CreditCard from '@/components/Dashboard/CreditCard'
import FlexRowTabs from '@/components/Dashboard/FlexRowTabs'
import { Button } from '@/components/ui/button'
import { getWeeklyTransactions } from '@/lib/actions/getWeeklyTransactions'
import { prisma } from '@/lib/prisma'
import { ROUTES } from '@/lib/routes'
import { checkUser } from '@/lib/userCheck'
import Link from 'next/link'

const Accounts = async () => {
  const { email } = await checkUser()

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      cards: {
        take: 1,
      },
      transactions: true,
    },
  })

  if (!user) throw new Error('401 Unauthorized!')

  const amountCalculation = (type: 'income' | 'expense' | 'transfer') => {
    return user?.transactions
      .filter(tr => tr.type === type)
      .reduce((acc, curr) => curr.amount + acc, 0)
  }

  const initialData = await getWeeklyTransactions(0)

  let amount = 0

  if (user?.cards.length > 0) amount = user.cards[0].balance

  const accounts = [
    {
      src: '/dash/accounts/balance.png',
      title: 'My Balance',
      amount,
      color: '#FFF5D9',
    },
    {
      src: '/dash/accounts/income.png',
      title: 'Income',
      amount: amountCalculation('income'),
      color: '#E7EDFF',
    },
    {
      src: '/dash/accounts/expense.png',
      title: 'Expense',
      amount: amountCalculation('expense'),
      color: '#FFE0EB',
    },
    {
      src: '/dash/accounts/saving.png',
      title: 'Transfer',
      amount: amountCalculation('transfer'),
      color: '#DCFAF8',
    },
  ]
  return (
    <>
      <div className="grid w-full grid-cols-1 gap-x-7 gap-y-6 p-3 lg:grid-cols-2 xl:grid-cols-6 xl:px-10 xl:py-8">
        <div className="bg-sidebar flex flex-wrap justify-between gap-5 gap-y-5 rounded-3xl px-2 py-5 pl-5 tracking-wide sm:flex-row sm:items-center sm:px-9 md:py-6 lg:col-span-2 xl:col-span-6">
          <FlexRowTabs data={accounts} />
        </div>
        <div className="lg:col-span-2 xl:col-start-1 xl:col-end-5">
          <h3 className="mb-5 py-0.5 text-xl font-bold sm:text-2xl">
            Resent Transaction
          </h3>
          <LastTransaction />
        </div>
        <div className="lg:col-span-2 xl:col-start-5 xl:col-end-7">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-bold sm:text-2xl">My Cards</h3>
            <Link href={ROUTES.CREDIT_CARDS}>
              <Button variant={'link'} className="py-0">
                See All
              </Button>
            </Link>
          </div>
          <CreditCard take={3} />
        </div>
        <div className="lg:col-span-2 xl:col-start-1 xl:col-end-5">
          <h3 className="mb-5 py-0.5 text-xl font-bold sm:text-2xl">
            Debit & Credit Overview
          </h3>
          <DebitCredit initialData={initialData} />
        </div>
        <div className="xl:col-start-5 xl:col-end-7">
          <h3 className="mb-6 text-xl font-bold sm:text-2xl">Invoices Sent</h3>
          <InvoicesSent />
        </div>
      </div>
    </>
  )
}

export default Accounts
