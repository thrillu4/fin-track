'use client'

import * as React from 'react'
import { LabelList, Pie, PieChart } from 'recharts'

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
import { getExpensesByCategory } from '@/lib/actions/getExpensesByCategory'
import { LoaderCircle } from 'lucide-react'

interface ExpenseData {
  key: string
  transaction: string
  percent: number
  amount: number
  fill: string
}

const chartConfig = {
  Salary: {
    label: 'Salary',
    color: 'var(--chart-1)',
  },
  Food: {
    label: 'Food',
    color: 'var(--chart-2)',
  },
  Investment: {
    label: 'Investment',
    color: 'var(--chart-3)',
  },
  Shopping: {
    label: 'Shopping',
    color: 'var(--chart-4)',
  },
  Transport: {
    label: 'Transport',
    color: 'var(--chart-5)',
  },
  Entertainment: {
    label: 'Entertainment',
    color: 'var(--credit)',
  },
  other: {
    label: 'Other',
    color: 'var(--debit)',
  },
} satisfies ChartConfig

export function ChartPieLabelList() {
  const [chartData, setChartData] = React.useState<ExpenseData[] | null>(null)
  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getExpensesByCategory()
        setChartData(data)
      } catch (error) {
        console.error('Failed to load expenses data:', error)
      }
    }

    loadData()
  }, [])

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().toLocaleString('en-US', { month: 'long' })

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your expenses in %</CardTitle>
        <CardDescription>
          January - {currentMonth} {currentYear}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 px-0 pb-0 sm:px-6">
        {chartData === null ? (
          <div className="flex h-[360px] items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-93 items-center justify-center">
            <div className="text-muted-foreground text-center">
              <p>No expense data available</p>
              <p className="text-sm">
                Start adding transactions to see your spending breakdown
              </p>
            </div>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-80 w-full font-bold sm:h-93 [&_.recharts-text]:fill-white"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="key" hideLabel />}
              />
              <Pie data={chartData} dataKey="percent">
                <LabelList
                  dataKey="key"
                  className="fill-background"
                  stroke="none"
                  fontSize={12}
                  formatter={(value: string) => {
                    const config =
                      chartConfig[value as keyof typeof chartConfig]
                    return config?.label || value
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
