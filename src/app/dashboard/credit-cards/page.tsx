import { auth } from '@/auth'
import CreditCard from '@/components/Dashboard/CreditCard'
import AddNewCardForm from '@/components/Dashboard/CreditCards/AddNewCardForm'
import { CardExpenseStatistic } from '@/components/Dashboard/CreditCards/CardExpenseStatistic'
import CardList from '@/components/Dashboard/CreditCards/CardList'
import CardSetting from '@/components/Dashboard/CreditCards/CardSetting'
import { prisma } from '@/lib/prisma'

const CreditCards = async () => {
  const session = await auth()

  if (!session?.user?.email) return

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
  })

  const data = await prisma.transaction.groupBy({
    by: ['category'],
    where: {
      type: 'expense',
      userId: user?.id,
    },
    _sum: {
      amount: true,
    },
    orderBy: {
      _sum: {
        amount: 'desc',
      },
    },
  })

  return (
    <>
      <div className="grid w-full grid-cols-6 gap-x-7 gap-y-6 p-6">
        <div className="col-start-1 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">My Cards</h3>
          <CreditCard take={6} />
        </div>
        <div className="col-start-1 col-end-3">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">
            Card Expense Statistics
          </h3>
          <CardExpenseStatistic data={data} />
        </div>
        <div className="col-start-3 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Card List</h3>
          <CardList user={user} />
        </div>
        <div className="col-start-1 col-end-5">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Add New Card</h3>
          <AddNewCardForm />
        </div>
        <div className="col-start-5 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Card Setting</h3>
          <CardSetting />
        </div>
      </div>
    </>
  )
}

export default CreditCards
