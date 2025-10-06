'use client'

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

export const description = 'A bar chart with a label'

const chartData = [
  { month: 'April', expense: 1200 },
  { month: 'May', expense: 2209 },
  { month: 'June', expense: 2214 },
  { month: 'July', expense: 3186 },
  { month: 'August', expense: 1305 },
  { month: 'September', expense: 2237 },
]

const chartConfig = {
  expense: {
    label: 'Expense',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function MyExpense() {
  return (
    <Card>
      <CardContent>
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
    </Card>
  )
}
