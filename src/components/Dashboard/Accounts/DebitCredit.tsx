'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import {
  getWeeklyTransactions,
  WeeklyData,
} from '@/lib/actions/getWeeklyTransactions'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { useState, useTransition } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

const chartConfig = {
  debit: {
    label: 'Debit',
    color: 'hsl(var(--destructive))',
  },
  credit: {
    label: 'Credit',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig

interface DebitCreditProps {
  initialData: WeeklyData
}

export function DebitCredit({ initialData }: DebitCreditProps) {
  const [data, setData] = useState<WeeklyData>(initialData)
  const [weekOffset, setWeekOffset] = useState(0)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  const fetchData = async (offset: number) => {
    startTransition(async () => {
      try {
        setError(null)
        const result = await getWeeklyTransactions(offset)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        console.error('Error fetching data:', err)
      }
    })
  }

  const handlePreviousWeek = () => {
    const newOffset = weekOffset - 1
    setWeekOffset(newOffset)
    fetchData(newOffset)
  }

  const handleNextWeek = () => {
    const newOffset = weekOffset + 1
    setWeekOffset(newOffset)
    fetchData(newOffset)
  }

  const handleCurrentWeek = () => {
    setWeekOffset(0)
    fetchData(0)
  }

  if (error) {
    return (
      <Card>
        <CardContent className="flex h-[400px] flex-col items-center justify-center gap-4">
          <p className="text-destructive">Error: {error}</p>
          <Button onClick={() => fetchData(weekOffset)} variant="outline">
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <CardDescription>
              ${data.totalDebit.toLocaleString()} Debited & $
              {data.totalCredit.toLocaleString()} Credited
            </CardDescription>
            <p className="text-muted-foreground text-sm">
              {data.weekStart} - {data.weekEnd}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousWeek}
              disabled={isPending}
              className="h-8 w-8"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
            {weekOffset !== 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCurrentWeek}
                disabled={isPending}
                className="h-8"
              >
                Current
              </Button>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextWeek}
              disabled={weekOffset >= 0 || isPending}
              className="h-8 w-8"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[260px] w-full">
          <BarChart accessibilityLayer data={data.chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="debit" fill="var(--debit)" radius={4} />
            <Bar dataKey="credit" fill="var(--credit)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
