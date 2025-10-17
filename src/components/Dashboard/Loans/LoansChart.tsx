'use client'

import { Card, CardContent } from '@/components/ui/card'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { TrendingUpDown } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

type Loan = {
  id: string
  loanType: string
  amount: number
  balance: number
  status: string
}

interface LoanChartProps {
  loans: Loan[]
}

export function LoansChart({ loans }: LoanChartProps) {
  const data = loans.reduce(
    (acc: { loanType: string; balance: number }[], loan) => {
      const found = acc.find(d => d.loanType === loan.loanType)
      if (found) {
        found.balance += loan.balance
      } else {
        acc.push({ loanType: loan.loanType, balance: loan.balance })
      }
      return acc
    },
    [],
  )
  if (loans.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <TrendingUpDown />
          </EmptyMedia>
          <EmptyTitle>Loans data is empty</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }
  return (
    <Card>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="loanType"
              fontSize={12}
              angle={-45}
              textAnchor="end"
              interval={0}
            />
            <YAxis fontSize={12} width={50} />
            <Tooltip />
            <Bar dataKey="balance" fill="var(--primary)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
