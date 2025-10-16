'use client'

import { useEffect, useState } from 'react'
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getMonthlyExpenses } from '@/lib/actions/getMonthlyExpenses'
import { LoaderCircle } from 'lucide-react'

export const description = 'A bar chart with expenses from database'

const chartConfig = {
  expense: {
    label: 'Expense',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

type ChartData = {
  month: string
  expense: number
}

export function MyExpense({ data }: { data: ChartData[] }) {
  const [chartData, setChartData] = useState<ChartData[] | null>(data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMonthlyExpenses()
        setChartData(data)
      } catch (error) {
        console.error('Failed to fetch expense data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Card>
      {chartData === null ? (
        <div className="flex h-[195px] items-center justify-center">
          <LoaderCircle className="animate-spin" />
        </div>
      ) : chartData.length === 0 ? (
        <Card className="mx-6 py-0">
          <CardContent className="flex h-[195px] items-center justify-center">
            <p className="text-muted-foreground">No expense data available</p>
          </CardContent>
        </Card>
      ) : (
        <CardContent className="px-1 sm:px-6">
          <ChartContainer config={chartConfig} className="max-h-[195px] w-full">
            <BarChart
              accessibilityLayer
              data={chartData}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="expense" fill="var(--color-expense)" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                  formatter={(value: number) => `$${value}`}
                />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
    </Card>
  )
}
