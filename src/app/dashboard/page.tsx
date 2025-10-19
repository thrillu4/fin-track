import CreditCard from '@/components/Dashboard/CreditCard'
import { BalanceHistory } from '@/components/Dashboard/Home/BalanceHistory'
import BankActivityChart from '@/components/Dashboard/Home/BankActivityChart'
import { ChartPieLabelList } from '@/components/Dashboard/Home/ChartPieLabelList'
import QuickTransfer from '@/components/Dashboard/Home/QuickTransfer'
import RecentTransaction from '@/components/Dashboard/Home/RecentTransaction'
import { Button } from '@/components/ui/button'
import { getExpensesByCategory } from '@/lib/actions/getExpensesByCategory'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

export default async function Page() {
  const data = await getExpensesByCategory()

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-x-7 gap-y-6 p-3 lg:grid-cols-2 xl:grid-cols-6">
        <div className="xl:col-start-1 xl:col-end-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-2xl font-bold">My Cards</h3>
            <Link href={ROUTES.CREDIT_CARDS}>
              <Button variant={'link'} className="py-0">
                See All
              </Button>
            </Link>
          </div>
          <CreditCard take={4} />
        </div>
        <div className="xl:col-start-5 xl:col-end-7">
          <h3 className="mb-5 py-0.5 text-xl font-bold md:text-xl">
            Resent Transaction
          </h3>
          <RecentTransaction />
        </div>
        <div className="lg:col-start-1 lg:col-end-3 xl:col-end-5">
          <h3 className="mb-5 py-0.5 text-xl font-bold md:text-xl">
            Your Activity
          </h3>
          <BankActivityChart />
        </div>
        <div className="xl:col-start-5 xl:col-end-7">
          <h3 className="mb-5 py-0.5 text-xl font-bold md:text-xl">
            Expense Statistics
          </h3>
          <ChartPieLabelList data={data} />
        </div>
        <div className="xl:col-start-1 xl:col-end-4 2xl:col-end-3">
          <h3 className="mb-5 py-0.5 text-xl font-bold md:text-xl">
            Quick Transfer
          </h3>

          <QuickTransfer />
        </div>
        <div className="lg:col-start-1 lg:col-end-3 xl:col-start-4 xl:col-end-7 2xl:col-start-3">
          <h3 className="mb-5 py-0.5 text-xl font-bold md:text-xl">
            Balance History
          </h3>
          <BalanceHistory />
        </div>
      </div>
    </>
  )
}
