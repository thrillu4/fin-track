import FlexRowTabs from '@/components/Dashboard/FlexRowTabs'
import MyInvestments from '@/components/Dashboard/Investments/MyInvestments'
import TrendingStock from '@/components/Dashboard/Investments/TrendingStock'
import { YearlyInvestment } from '@/components/Dashboard/Investments/YearlyInvestment'
import { YearlyProfit } from '@/components/Dashboard/Investments/YearlyProfit'
import { getYearlyInvestment } from '@/lib/actions/getYearlyInvestment'
import { getYearlyProfit } from '@/lib/actions/getYearlyProfit'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'

const Investments = async () => {
  const { email } = await checkUser()

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      investments: true,
    },
  })

  if (!user) throw new Error('401 Unauthorized')

  let totalInvested = 0
  let currInvValue = 0

  if (user.investments.length > 0) {
    totalInvested = user.investments.reduce(
      (prev, curr) => curr.amountInvested + prev,
      0,
    )
    currInvValue = user.investments.reduce(
      (prev, curr) => curr.currentValue + prev,
      0,
    )
  }

  let rateReturn = 0
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
      title: 'Investments Value',
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

  const data = await getYearlyProfit()

  return (
    <>
      <div className="grid w-full grid-cols-1 gap-x-7 gap-y-6 p-3 xl:grid-cols-6 xl:px-10 xl:py-8">
        <div className="bg-sidebar flex flex-wrap justify-between gap-5 gap-y-5 rounded-3xl px-2 py-5 pl-5 tracking-wide sm:flex-row sm:items-center sm:px-9 md:py-6 xl:col-span-6">
          <FlexRowTabs data={investments} />
        </div>
        <div className="xl:col-start-1 xl:col-end-4">
          <h3 className="mb-5 py-0.5 text-xl font-bold sm:text-2xl">
            Yearly Total Investment
          </h3>
          <YearlyInvestment data={chartData} />
        </div>
        <div className="xl:col-start-4 xl:col-end-7">
          <h3 className="mb-5 py-0.5 text-xl font-bold sm:text-2xl">
            Yearly Investment Profit
          </h3>
          <YearlyProfit data={data} />
        </div>
        <div className="xl:col-start-1 xl:col-end-5">
          <h3 className="mb-5 py-0.5 text-xl font-bold sm:text-2xl">
            My Investments
          </h3>
          <MyInvestments />
        </div>
        <div className="xl:col-start-5 xl:col-end-7">
          <h3 className="mb-5 py-0.5 text-xl font-bold sm:text-2xl">
            Trending Stock
          </h3>
          <div className="rounded-3xl bg-[var(--sidebar)] px-1 py-3">
            <TrendingStock />
          </div>
        </div>
      </div>
    </>
  )
}

export default Investments
