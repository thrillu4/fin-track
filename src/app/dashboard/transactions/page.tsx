import CreditCard from '@/components/Dashboard/CreditCard'
import { DataTable } from '@/components/Dashboard/Transactions/DataTable'
import { MyExpense } from '@/components/Dashboard/Transactions/MyExpense'
import { Button } from '@/components/ui/button'
import { getMonthlyExpenses } from '@/lib/actions/getMonthlyExpenses'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
const Transactions = async () => {
  const expenses = await getMonthlyExpenses()

  return (
    <div className="space-y-7 p-3 sm:p-6">
      <div className="grid w-full grid-cols-1 gap-x-7 sm:grid-cols-6">
        <div className="sm:col-start-1 sm:col-end-5">
          <div>
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
        </div>
        <div className="sm:col-start-5 sm:col-end-7">
          <h3 className="mb-5 text-2xl font-bold">My Expense</h3>
          <MyExpense data={expenses} />
        </div>
      </div>
      <DataTable />
    </div>
  )
}

export default Transactions
