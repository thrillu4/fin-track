'use client'

import * as React from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getBalanceHistory } from '@/lib/actions/getBalanceHistory'
import { LoaderCircle } from 'lucide-react'

interface BalanceData {
  month: string
  income: number
}

const chartConfig = {
  desktop: {
    label: 'Balance',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function BalanceHistory() {
  const [chartData, setChartData] = React.useState<BalanceData[] | null>(null)

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getBalanceHistory()
        setChartData(data)
      } catch (error) {
        console.error('Failed to load balance history:', error)
      }
    }

    loadData()
  }, [])

  return (
    <Card>
      <CardContent className="h-[250px] w-full">
        {chartData === null ? (
          <div className="flex h-[360px] items-center justify-center">
            <LoaderCircle className="animate-spin" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-muted-foreground">
              No balance data available
            </div>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={value => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      indicator="dot"
                      hideLabel
                      formatter={value => [
                        `$${Number(value).toLocaleString()}`,
                        'Balance',
                      ]}
                    />
                  }
                />
                <Area
                  dataKey="income"
                  type="linear"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
