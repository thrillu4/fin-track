'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

const chartData = [
  { date: '2025-04-01', income: 15420, expenses: 8750 },
  { date: '2025-04-02', income: 8970, expenses: 12800 },
  { date: '2025-04-03', income: 12670, expenses: 9200 },
  { date: '2025-04-04', income: 18420, expenses: 15600 },
  { date: '2025-04-05', income: 25730, expenses: 18900 },
  { date: '2025-04-06', income: 21010, expenses: 22400 },
  { date: '2025-04-07', income: 16450, expenses: 13800 },
  { date: '2025-04-08', income: 28090, expenses: 19200 },
  { date: '2025-04-09', income: 5590, expenses: 8100 },
  { date: '2025-04-10', income: 17610, expenses: 14900 },
  { date: '2025-04-11', income: 22270, expenses: 21500 },
  { date: '2025-04-12', income: 19920, expenses: 16100 },
  { date: '2025-04-13', income: 23420, expenses: 24800 },
  { date: '2025-04-14', income: 11370, expenses: 17200 },
  { date: '2025-04-15', income: 10200, expenses: 13700 },
  { date: '2025-04-16', income: 11380, expenses: 14900 },
  { date: '2025-04-17', income: 30460, expenses: 22600 },
  { date: '2025-04-18', income: 24640, expenses: 26100 },
  { date: '2025-04-19', income: 16430, expenses: 13800 },
  { date: '2025-04-20', income: 7890, expenses: 11500 },
  { date: '2025-04-21', income: 11370, expenses: 16000 },
  { date: '2025-04-22', income: 15240, expenses: 13700 },
  { date: '2025-04-23', income: 11380, expenses: 18300 },
  { date: '2025-04-24', income: 26370, expenses: 19900 },
  { date: '2025-04-25', income: 15150, expenses: 17500 },
  { date: '2025-04-26', income: 6750, expenses: 10300 },
  { date: '2025-04-27', income: 26030, expenses: 28200 },
  { date: '2025-04-28', income: 10220, expenses: 13800 },
  { date: '2025-04-29', income: 21450, expenses: 16400 },
  { date: '2025-04-30', income: 30540, expenses: 24800 },
  { date: '2025-05-01', income: 13650, expenses: 17200 },
  { date: '2025-05-02', income: 19930, expenses: 21100 },
  { date: '2025-05-03', income: 16470, expenses: 14900 },
  { date: '2025-05-04', income: 26250, expenses: 28200 },
  { date: '2025-05-05', income: 32810, expenses: 25900 },
  { date: '2025-05-06', income: 33980, expenses: 35200 },
  { date: '2025-05-07', income: 26380, expenses: 20000 },
  { date: '2025-05-08', income: 12490, expenses: 16100 },
  { date: '2025-05-09', income: 15270, expenses: 13800 },
  { date: '2025-05-10', income: 19930, expenses: 23300 },
  { date: '2025-05-11', income: 22750, expenses: 18700 },
  { date: '2025-05-12', income: 14970, expenses: 16400 },
  { date: '2025-05-13', income: 14970, expenses: 12600 },
  { date: '2025-05-14', income: 30480, expenses: 32900 },
  { date: '2025-05-15', income: 32230, expenses: 24800 },
  { date: '2025-05-16', income: 22980, expenses: 26000 },
  { date: '2025-05-17', income: 33990, expenses: 28200 },
  { date: '2025-05-18', income: 21450, expenses: 21500 },
  { date: '2025-05-19', income: 15950, expenses: 13800 },
  { date: '2025-05-20', income: 13770, expenses: 18300 },
  { date: '2025-05-21', income: 6820, expenses: 11400 },
  { date: '2025-05-22', income: 6810, expenses: 10200 },
  { date: '2025-05-23', income: 17520, expenses: 19900 },
  { date: '2025-05-24', income: 19940, expenses: 17200 },
  { date: '2025-05-25', income: 14010, expenses: 17500 },
  { date: '2025-05-26', income: 15130, expenses: 13700 },
  { date: '2025-05-27', income: 28200, expenses: 30600 },
  { date: '2025-05-28', income: 15830, expenses: 14900 },
  { date: '2025-05-29', income: 6780, expenses: 10300 },
  { date: '2025-05-30', income: 22400, expenses: 18800 },
  { date: '2025-05-31', income: 13780, expenses: 18300 },
  { date: '2025-06-01', income: 13780, expenses: 16000 },
  { date: '2025-06-02', income: 31700, expenses: 26100 },
  { date: '2025-06-03', income: 9030, expenses: 12600 },
  { date: '2025-06-04', income: 29890, expenses: 24800 },
  { date: '2025-06-05', income: 7880, expenses: 11400 },
  { date: '2025-06-06', income: 19940, expenses: 17500 },
  { date: '2025-06-07', income: 22030, expenses: 25700 },
  { date: '2025-06-08', income: 26250, expenses: 19200 },
  { date: '2025-06-09', income: 29880, expenses: 32800 },
  { date: '2025-06-10', income: 13550, expenses: 16000 },
  { date: '2025-06-11', income: 7920, expenses: 11500 },
  { date: '2025-06-12', income: 33520, expenses: 28200 },
  { date: '2025-06-13', income: 6810, expenses: 10300 },
  { date: '2025-06-14', income: 28860, expenses: 24800 },
  { date: '2025-06-15', income: 20870, expenses: 21500 },
  { date: '2025-06-16', income: 25210, expenses: 21100 },
  { date: '2025-06-17', income: 32250, expenses: 35200 },
  { date: '2025-06-18', income: 9070, expenses: 13700 },
  { date: '2025-06-19', income: 23110, expenses: 19900 },
  { date: '2025-06-20', income: 27680, expenses: 30500 },
  { date: '2025-06-21', income: 13690, expenses: 16100 },
  { date: '2025-06-22', income: 21570, expenses: 18700 },
  { date: '2025-06-23', income: 32800, expenses: 36300 },
  { date: '2025-06-24', income: 11320, expenses: 13800 },
  { date: '2025-06-25', income: 11410, expenses: 14900 },
  { date: '2025-06-26', income: 29540, expenses: 24800 },
  { date: '2025-06-27', income: 30480, expenses: 32900 },
  { date: '2025-06-28', income: 12490, expenses: 16000 },
  { date: '2025-06-29', income: 9030, expenses: 12600 },
  { date: '2025-06-30', income: 30460, expenses: 26000 },
]

const chartConfig = {
  activity: {
    label: 'Activity',
  },
  income: {
    label: 'Income',
    color: 'var(--primary)',
  },
  expenses: {
    label: 'Expenses',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export default function BankActivityChart() {
  const [timeRange, setTimeRange] = React.useState('90d')

  const filteredData = chartData.filter(item => {
    const date = new Date(item.date)
    const referenceDate = new Date('2025-06-30')
    let daysToSubtract = 90
    if (timeRange === '30d') {
      daysToSubtract = 30
    } else if (timeRange === '7d') {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  const totalIncome = filteredData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = filteredData.reduce(
    (sum, item) => sum + item.expenses,
    0,
  )
  const balance = totalIncome - totalExpenses

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <Card className="w-full gap-0 py-2">
      <CardHeader className="flex flex-col gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1">
          <CardTitle>Bank Activity</CardTitle>
          <CardDescription>
            Income and expenses for selected period
          </CardDescription>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden sm:flex"
          >
            <ToggleGroupItem value="90d">3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="w-full sm:hidden"
              aria-label="Select period"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="text-muted-foreground text-sm">Income</div>
            <div className="text-2xl font-bold">
              {formatCurrency(totalIncome)}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-muted-foreground text-sm">Expenses</div>
            <div className="text-2xl font-bold">
              {formatCurrency(totalExpenses)}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-muted-foreground text-sm">Balance</div>
            <div className="text-2xl font-bold">{formatCurrency(balance)}</div>
          </div>
        </div>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-income)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-expenses)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              opacity={0.3}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={value => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={value => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={value => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                    })
                  }}
                  formatter={(value, name) => [
                    formatCurrency(Number(value)),
                    name === 'income' ? 'Income' : 'Expenses',
                  ]}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="income"
              type="monotone"
              fill="url(#fillIncome)"
              stroke="var(--color-income)"
              strokeWidth={2}
            />
            <Area
              dataKey="expenses"
              type="monotone"
              fill="url(#fillExpenses)"
              stroke="var(--color-expenses)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
