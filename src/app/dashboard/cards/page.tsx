import CreditCard from '@/components/Dashboard/CreditCard'
import AddNewCardForm from '@/components/Dashboard/CreditCards/AddNewCardForm'
import { CardExpenseStatistic } from '@/components/Dashboard/CreditCards/CardExpenseStatistic'
import CardList from '@/components/Dashboard/CreditCards/CardList'
import CardSetting from '@/components/Dashboard/CreditCards/CardSetting'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'

const CreditCards = async () => {
  const { email } = await checkUser()

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      _count: {
        select: { cards: true },
      },
    },
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
      <div className="grid w-full grid-cols-1 gap-x-7 gap-y-6 p-3 sm:p-6 lg:grid-cols-6">
        <div className="lg:col-start-1 lg:col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">My Cards</h3>
          <CreditCard take={user?._count.cards || 0} />
        </div>
        <div className="lg:col-start-1 lg:col-end-3">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">
            Card Expense Statistics
          </h3>
          <CardExpenseStatistic data={data} />
        </div>
        <div className="lg:col-start-3 lg:col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Card List</h3>
          <CardList user={user} />
        </div>
        <div id="add-new-card" className="lg:col-start-1 lg:col-end-5">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Add New Card</h3>
          <AddNewCardForm />
        </div>
        <div className="lg:col-start-5 lg:col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Card Setting</h3>
          <CardSetting />
        </div>
      </div>
    </>
  )
}

export default CreditCards
