'use client'

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

const chartData = [
  { day: 'Monday', debit: 1250, credit: 890 },
  { day: 'Tuesday', debit: 980, credit: 1100 },
  { day: 'Wednesday', debit: 1420, credit: 760 },
  { day: 'Thursday', debit: 1100, credit: 920 },
  { day: 'Friday', debit: 1380, credit: 1050 },
  { day: 'Saturday', debit: 890, credit: 480 },
  { day: 'Sunday', debit: 540, credit: 220 },
]

const chartConfig = {
  debit: {
    label: 'Debit',
    color: 'hsl(var(--destructive))',
  },
  credit: {
    label: 'Credit',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

export function DebitCredit() {
  const totalDebit = chartData.reduce((sum, day) => sum + day.debit, 0)
  const totalCredit = chartData.reduce((sum, day) => sum + day.credit, 0)

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardDescription>
          ${totalDebit.toLocaleString()} Debited & $
          {totalCredit.toLocaleString()} Credited in this Week
        </CardDescription>
        <CardDescription className="flex items-center gap-8">
          <div className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 rounded-xs bg-[var(--debit)]" />
            Debit
          </div>
          <div className="flex items-center gap-2.5">
            <div className="h-2.5 w-2.5 rounded-xs bg-[var(--credit)]" />
            Credit
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[260px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="debit" fill="var(--debit)" radius={4} />
            <Bar dataKey="credit" fill="var(--credit)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
