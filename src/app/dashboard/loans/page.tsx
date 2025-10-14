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

  return (
    <div className="grid w-full grid-cols-6 gap-x-7 gap-y-6 p-6">
      <FlexRowTabs data={data} />
      <div className="col-span-6">
        <h3 className="mb-5 py-0.5 text-2xl font-bold">Your Loans</h3>
        <YourLoans data={loans} />
      </div>
      <div className="col-span-6">
        <h3 className="mb-5 py-0.5 text-2xl font-bold">Loans By Type</h3>
        <LoansChart loans={loans} />
      </div>
    </div>
  )
}

export default Loans
