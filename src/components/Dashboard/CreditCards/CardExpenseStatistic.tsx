'use client'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty'
import { CircleDotDashed } from 'lucide-react'
import { LabelList, RadialBar, RadialBarChart } from 'recharts'

export const description = 'A radial chart with a label'

interface PropsData {
  category: string | null
  _sum: {
    amount: number | null
  }
}

export function CardExpenseStatistic({ data }: { data: PropsData[] }) {
  const chartData = data.map((obj, i) => {
    return {
      category: obj.category,
      amount: +(obj._sum.amount ?? 0).toFixed(2),
      fill: `var(--chart-${i + 1})`,
    }
  })

  const chartConfig: ChartConfig = chartData.reduce((acc, item, i) => {
    const key = item.category ?? `unknown-${i}`
    acc[key] = {
      label: item.category ?? 'Unknown',
      color: `var(--chart-${i + 1}`,
    }
    return acc
  }, {} as ChartConfig)

  if (data.length === 0) {
    return (
      <Empty className="mb-5 h-full max-h-[250px] border border-dashed">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleDotDashed />
          </EmptyMedia>
          <EmptyTitle>No card yet</EmptyTitle>
          <EmptyDescription>
            Your spending statistics will be displayed here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    )
  }

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={450}
            innerRadius={20}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="category" />}
            />
            <RadialBar dataKey="amount" background>
              <LabelList
                position="insideStart"
                dataKey="category"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="mx-auto grid grid-cols-2 gap-4">
        {data.map((obj, i) => (
          <div key={i} className="flex items-center justify-center gap-3">
            <div
              style={{ backgroundColor: `var(--chart-${i + 1})` }}
              className={`h-[15px] w-[15px] rounded-full`}
            />
            <div className="flex-1">{obj.category}</div>
          </div>
        ))}
      </CardFooter>
    </Card>
  )
}
