'use client'

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

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

export const description = 'A line chart showing yearly total investments'

const chartData = [
  { year: '2019', investment: 125000 },
  { year: '2020', investment: 185000 },
  { year: '2021', investment: 245000 },
  { year: '2022', investment: 198000 },
  { year: '2023', investment: 267000 },
  { year: '2024', investment: 312000 },
]

const chartConfig = {
  investment: {
    label: 'Total Investment',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function YearlyInvestment() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Yearly Total Investment</CardTitle>
        <CardDescription>2019 - 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
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
                  formatter={value => `$${value.toLocaleString()}`}
                />
              }
            />
            <Line
              dataKey="investment"
              type="natural"
              stroke="var(--primary)"
              strokeWidth={2}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
