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

interface ChartData {
  year: string
  investment: number
}

const chartConfig = {
  investment: {
    label: 'Total Investment',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig

export function YearlyInvestment({ data }: { data: ChartData[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle> Total Investment</CardTitle>
        <CardDescription>2021 - 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: -20,
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
