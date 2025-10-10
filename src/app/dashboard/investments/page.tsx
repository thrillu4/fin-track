import { auth } from '@/auth'
import FlexRowTabs from '@/components/Dashboard/FlexRowTabs'
import { MonthlyRevenue } from '@/components/Dashboard/Investments/MonthlyRevenue'
import MyInvestments from '@/components/Dashboard/Investments/MyInvestments'
import TrendingStock from '@/components/Dashboard/Investments/TrendingStock'
import { YearlyInvestment } from '@/components/Dashboard/Investments/YearlyInvestment'
import { getMonthlyRevenue } from '@/lib/actions/getMontlyRevenue'
import { getYearlyInvestment } from '@/lib/actions/getYearlyInvestment'
import { prisma } from '@/lib/prisma'

const Investments = async () => {
  const session = await auth()

  if (!session?.user?.email) return

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      investments: true,
    },
  })

  const totalInvested = user?.investments.reduce(
    (prev, curr) => curr.amountInvested + prev,
    0,
  )
  const currInvValue = user?.investments.reduce(
    (prev, curr) => curr.currentValue + prev,
    0,
  )
  let rateReturn
  if (!totalInvested || !currInvValue) {
    rateReturn = 0
  } else {
    rateReturn = ((totalInvested - currInvValue) / currInvValue) * 100
  }

  const chartData = await getYearlyInvestment()

  const investments = [
    {
      src: '/dash/investments/bag.png',
      title: 'Total Invested Amount',
      amount: totalInvested,
      color: '#bce9db',
    },
    {
      src: '/dash/investments/pie.png',
      title: 'Current Investments Value',
      amount: currInvValue,
      color: '#c2afbb',
    },
    {
      src: '/dash/investments/repeat.png',
      title: 'Rate of Return',
      color: '#c0cfe0',
      percent: rateReturn,
    },
  ]

  const data = await getMonthlyRevenue()
  return (
    <>
      <div className="grid w-full grid-cols-6 gap-x-7 gap-y-6 px-10 py-8">
        <FlexRowTabs data={investments} />
        <div className="col-start-1 col-end-4">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">
            Yearly Total Investment
          </h3>
          <YearlyInvestment data={chartData} />
        </div>
        <div className="col-start-4 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Monthly Revenue</h3>
          <MonthlyRevenue data={data} />
        </div>
        <div className="col-start-1 col-end-5">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">My Investments</h3>
          <MyInvestments />
        </div>
        <div className="col-start-5 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Trending Stock</h3>
          <div className="rounded-3xl bg-[var(--sidebar)] px-1 py-3">
            <TrendingStock />
          </div>
        </div>
      </div>
    </>
  )
}

export default Investments
