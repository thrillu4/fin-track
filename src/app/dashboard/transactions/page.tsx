import CreditCard from '@/components/Dashboard/CreditCard'
import { DataTable } from '@/components/Dashboard/data-table'
import { MyExpense } from '@/components/Dashboard/MyExpense'
import { Button } from '@/components/ui/button'
const Transactions = () => {
  return (
    <div className="space-y-7 p-6">
      <div className="grid w-full grid-cols-6 gap-x-7">
        <div className="col-start-1 col-end-5">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-2xl font-bold">My Cards</h3>
              <Button variant={'link'} className="py-0">
                See All
              </Button>
            </div>
            <CreditCard take={2} />
          </div>
        </div>
        <div className="col-start-5 col-end-7">
          <h3 className="mb-5 text-2xl font-bold">My Expense</h3>
          <MyExpense />
        </div>
      </div>
      <DataTable />
    </div>
  )
}

export default Transactions
