import FlexRowTabs from '@/components/Dashboard/FlexRowTabs'
import { MonthlyRevenue } from '@/components/Dashboard/MonthlyRevenue'
import { YearlyInvestment } from '@/components/Dashboard/YearlyInvestment'

const Investments = () => {
  const investments = [
    {
      src: '/dash/investments/bag.png',
      title: 'Total Invested Amount',
      amount: 15000,
      color: '#bce9db',
    },
    {
      src: '/dash/investments/pie.png',
      title: 'Number of Investments',
      amount: 1259,
      color: '#c2afbb',
    },
    {
      src: '/dash/investments/repeat.png',
      title: 'Rate of Return',
      color: '#c0cfe0',
      percent: 5.77,
    },
  ]
  return (
    <>
      <div className="grid w-full grid-cols-6 gap-x-7 gap-y-6 px-10 py-8">
        <FlexRowTabs data={investments} />
        <div className="col-start-1 col-end-4">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">
            Yearly Total Investment
          </h3>
          <YearlyInvestment />
        </div>
        <div className="col-start-4 col-end-7">
          <h3 className="mb-5 py-0.5 text-2xl font-bold">Monthly Revenue</h3>
          <MonthlyRevenue />
        </div>
      </div>
    </>
  )
}

export default Investments
