import CreditCard from '@/components/Dashboard/CreditCard'
import { BalanceHistory } from '@/components/Dashboard/Home/BalanceHistory'
import BankActivityChart from '@/components/Dashboard/Home/BankActivityChart'
import { ChartPieLabelList } from '@/components/Dashboard/Home/ChartPieLabelList'
import QuickTransfer from '@/components/Dashboard/Home/QuickTransfer'
import RecentTransaction from '@/components/Dashboard/Home/RecentTransaction'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <div className="grid w-full grid-cols-6 gap-x-7 gap-y-6 p-6">
        <div className="col-start-1 col-end-5">
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
        <div className="col-start-5 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Resent Transaction</h3>
          <RecentTransaction />
        </div>
        <div className="col-start-1 col-end-5">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Your Activity</h3>
          <BankActivityChart />
        </div>
        <div className="col-start-5 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Expense Statistics</h3>
          <ChartPieLabelList />
        </div>
        <div className="col-start-1 col-end-3">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Quick Transfer</h3>

          <QuickTransfer />
        </div>
        <div className="col-start-3 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Balance History</h3>
          <BalanceHistory />
        </div>
      </div>
    </>
  )
}
