import FlexRowTabs from '@/components/Dashboard/FlexRowTabs'
import { LoansChart } from '@/components/Dashboard/Loans/LoansChart'
import YourLoans from '@/components/Dashboard/Loans/YourLoans'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'

const Loans = async () => {
  const { user } = await checkUser()

  const loansCategory = await prisma.loan.groupBy({
    where: { userId: user?.id },
    by: ['loanType'],
    _sum: { amount: true },
  })

  const loans = await prisma.loan.findMany({
    where: { userId: user.id },
  })

  const data = loansCategory.slice(0, 4).map(loan => {
    return {
      src: `/dash/loans/${loan.loanType.toLowerCase()}.png`,
      title: `${loan.loanType} Loans`,
      amount: loan._sum.amount || 0,
      color:
        loan.loanType === 'Car'
          ? '#FFF5D9'
          : loan.loanType === 'Education'
            ? '#DCFAF8'
            : loan.loanType === 'Mortgage'
              ? '#e6e0e0'
              : loan.loanType === 'Personal'
                ? '#E7EDFF'
                : '#acacac',
    }
  })

  const emptyData = [
    {
      src: `/dash/loans/car.png`,
      title: 'Car Loans',
      amount: 0,
      color: '#FFF5D9',
    },
    {
      src: `/dash/loans/education.png`,
      title: 'Education Loans',
      amount: 0,
      color: '#DCFAF8',
    },
    {
      src: `/dash/loans/mortgage.png`,
      title: 'Mortgage Loans',
      amount: 0,
      color: '#e6e0e0',
    },
    {
      src: `/dash/loans/personal.png`,
      title: 'Personal Loans',
      amount: 0,
      color: '#E7EDFF',
    },
  ]

  return (
    <div className="grid w-full grid-cols-1 gap-x-7 gap-y-6 p-3 sm:p-6 xl:grid-cols-6">
      <div className="bg-sidebar flex flex-wrap justify-between gap-5 gap-y-5 rounded-3xl px-2 py-5 pl-5 tracking-wide sm:flex-row sm:items-center sm:px-9 md:py-6 xl:col-span-6">
        <FlexRowTabs data={data.length > 0 ? data : emptyData} />
      </div>
      <div className="xl:col-span-6">
        <h3 className="mb-5 py-0.5 text-2xl font-bold">Your Loans</h3>
        <YourLoans data={loans} />
      </div>
      <div className="xl:col-span-6">
        <h3 className="mb-5 py-0.5 text-2xl font-bold">Loans By Type</h3>
        <LoansChart loans={loans} />
      </div>
    </div>
  )
}

export default Loans
