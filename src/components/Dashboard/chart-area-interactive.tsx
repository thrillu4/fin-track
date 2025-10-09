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
import { getBankActivityData } from '@/lib/actions/getBankActivity'
import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

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

interface ChartDataPoint {
  date: string
  income: number
  expenses: number
}

export default function BankActivityChart() {
  const [timeRange, setTimeRange] = React.useState('90d')
  const [chartData, setChartData] = React.useState<ChartDataPoint[]>([])

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
        const data = await getBankActivityData(days)
        setChartData(data)
      } catch (error) {
        console.error('Failed to load bank activity data:', error)
      }
    }

    loadData()
  }, [timeRange])

  const totalIncome = chartData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = chartData.reduce((sum, item) => sum + item.expenses, 0)
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
        {chartData.length === 0 ? (
          <div className="flex h-[360px] items-center justify-center">
            <div className="text-muted-foreground">No data available</div>
          </div>
        ) : (
          <>
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
                <div className="text-2xl font-bold">
                  {formatCurrency(balance)}
                </div>
              </div>
            </div>
            <ChartContainer
              config={chartConfig}
              className="max-h-[250px] w-full"
            >
              <AreaChart data={chartData}>
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
          </>
        )}
      </CardContent>
    </Card>
  )
}
