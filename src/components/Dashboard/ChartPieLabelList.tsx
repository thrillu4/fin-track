'use client'

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

export const description = 'A pie chart with a label list'

const chartData = [
  {
    key: 'education',
    transaction: 'Education',
    percent: 17,
    fill: 'var(--color-education)',
  },
  {
    key: 'groceries',
    transaction: 'Groceries',
    percent: 26,
    fill: 'var(--color-groceries)',
  },
  {
    key: 'entertainment',
    transaction: 'Entertainment',
    percent: 12,
    fill: 'var(--color-entertainment)',
  },
  {
    key: 'shopping',
    transaction: 'Shopping',
    percent: 30,
    fill: 'var(--color-shopping)',
  },
  {
    key: 'other',
    transaction: 'Other',
    percent: 15,
    fill: 'var(--color-other)',
  },
]

const chartConfig = {
  percent: {
    label: '%',
  },
  education: {
    label: 'Education',
    color: 'var(--chart-1)',
  },
  groceries: {
    label: 'Groceries',
    color: 'var(--chart-2)',
  },
  entertainment: {
    label: 'Entertainment',
    color: 'var(--chart-3)',
  },
  shopping: {
    label: 'Shopping',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig

export function ChartPieLabelList() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Your expenses </CardTitle>
        <CardDescription>January - September 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square font-bold [&_.recharts-text]:fill-white"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="percent" hideLabel />}
            />
            <Pie data={chartData} dataKey="percent">
              <LabelList
                dataKey="key"
                className="fill-background"
                stroke="none"
                fontSize={14}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
