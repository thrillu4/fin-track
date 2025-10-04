'use client'

import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Columns,
  GripVertical,
  MoreVertical,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import * as React from 'react'
import { z } from 'zod'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export const schema = z.object({
  id: z.number(),
  header: z.string(),
  type: z.string(),
  card: z.string(),
  date: z.string(),
  amount: z.string(),
})

const initialData: z.infer<typeof schema>[] = [
  {
    id: 1,
    header: 'Spotify Subscription',
    type: 'Entertainment',
    card: '1234 5678 9012 3456',
    date: '2025-09-02',
    amount: '-12.99',
  },
  {
    id: 2,
    header: 'Salary Deposit',
    type: 'Income',
    card: '9876 5432 1098 7654',
    date: '2025-09-01',
    amount: '+3200.00',
  },
  {
    id: 3,
    header: 'Amazon Purchase',
    type: 'Shopping',
    card: '1234 5678 9012 3456',
    date: '2025-09-04',
    amount: '-89.49',
  },
  {
    id: 4,
    header: 'Starbucks Coffee',
    type: 'Food & Drink',
    card: '1234 5678 9012 3456',
    date: '2025-09-05',
    amount: '-4.85',
  },
  {
    id: 5,
    header: 'Netflix Subscription',
    type: 'Entertainment',
    card: '1234 5678 9012 3456',
    date: '2025-09-07',
    amount: '-15.99',
  },
  {
    id: 6,
    header: 'ATM Withdrawal',
    type: 'Cash',
    card: '1234 5678 9012 3456',
    date: '2025-09-08',
    amount: '-100.00',
  },
  {
    id: 7,
    header: 'Utility Bill Payment',
    type: 'Bills',
    card: '1234 5678 9012 3456',
    date: '2025-09-09',
    amount: '-76.32',
  },
  {
    id: 8,
    header: 'Freelance Payment',
    type: 'Income',
    card: '9876 5432 1098 7654',
    date: '2025-09-10',
    amount: '+450.00',
  },
  {
    id: 9,
    header: 'Uber Ride',
    type: 'Transport',
    card: '1234 5678 9012 3456',
    date: '2025-09-11',
    amount: '-8.75',
  },
  {
    id: 10,
    header: 'Restaurant Dinner',
    type: 'Food & Drink',
    card: '1234 5678 9012 3456',
    date: '2025-09-13',
    amount: '-42.10',
  },
  {
    id: 11,
    header: 'Transfer to Savings',
    type: 'Transfer',
    card: '1234 5678 9012 3456',
    date: '2025-09-14',
    amount: '-300.00',
  },
  {
    id: 12,
    header: 'Airbnb Booking',
    type: 'Travel',
    card: '1234 5678 9012 3456',
    date: '2025-09-15',
    amount: '-210.50',
  },
  {
    id: 13,
    header: 'Gym Membership',
    type: 'Health',
    card: '1234 5678 9012 3456',
    date: '2025-09-16',
    amount: '-35.00',
  },
  {
    id: 14,
    header: 'Interest Income',
    type: 'Income',
    card: '9876 5432 1098 7654',
    date: '2025-09-17',
    amount: '+5.32',
  },
  {
    id: 15,
    header: 'Google Cloud Services',
    type: 'Bills',
    card: '1234 5678 9012 3456',
    date: '2025-09-18',
    amount: '-23.80',
  },
  {
    id: 16,
    header: 'Transfer from Friend',
    type: 'Transfer',
    card: '9876 5432 1098 7654',
    date: '2025-09-19',
    amount: '+150.00',
  },
  {
    id: 17,
    header: 'Apple Store Purchase',
    type: 'Shopping',
    card: '1234 5678 9012 3456',
    date: '2025-09-21',
    amount: '-245.99',
  },
  {
    id: 18,
    header: 'Grocery Store',
    type: 'Shopping',
    card: '1234 5678 9012 3456',
    date: '2025-09-22',
    amount: '-65.75',
  },
  {
    id: 19,
    header: 'Flight Ticket',
    type: 'Travel',
    card: '1234 5678 9012 3456',
    date: '2025-09-24',
    amount: '-480.00',
  },
  {
    id: 20,
    header: 'Electricity Refund',
    type: 'Income',
    card: '9876 5432 1098 7654',
    date: '2025-09-25',
    amount: '+22.14',
  },
]

function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 cursor-grab hover:bg-transparent active:cursor-grabbing"
    >
      <GripVertical className="text-muted-foreground size-4" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: 'drag',
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    id: 'select',
    header: ({ table }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={value => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'header',
    header: 'Transaction',
    cell: ({ row }) => {
      return <TransactionViewer item={row.original} />
    },
    enableHiding: false,
  },
  {
    accessorKey: 'type',
    header: 'Category',
    cell: ({ row }) => (
      <div className="w-32">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.type}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: 'card',
    header: 'Card',
    cell: ({ row }) => (
      <div className="text-muted-foreground font-mono text-xs">
        •••• {row.original.card.slice(-4)}
      </div>
    ),
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      return (
        <div className="text-sm">
          {date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: () => <div className="w-full text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.original.amount)
      const isPositive = amount > 0
      return (
        <div
          className={`flex items-center justify-end gap-1 text-right font-medium ${isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
        >
          {isPositive ? (
            <TrendingUp className="size-4" />
          ) : (
            <TrendingDown className="size-4" />
          )}
          ${Math.abs(amount).toFixed(2)}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <MoreVertical className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Duplicate</DropdownMenuItem>
          <DropdownMenuItem>Add Note</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
]

function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })

  return (
    <TableRow
      data-state={row.getIsSelected() && 'selected'}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map(cell => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}

export function DataTable() {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })
  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  )

  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data],
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: row => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData(data => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const totalIncome = React.useMemo(() => {
    return data.reduce((sum, item) => {
      const amount = parseFloat(item.amount)
      return amount > 0 ? sum + amount : sum
    }, 0)
  }, [data])

  const totalExpenses = React.useMemo(() => {
    return data.reduce((sum, item) => {
      const amount = parseFloat(item.amount)
      return amount < 0 ? sum + Math.abs(amount) : sum
    }, 0)
  }, [data])

  return (
    <div className="flex w-full flex-col gap-6 p-4 lg:p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
            <p className="text-muted-foreground text-sm">
              Manage and track your financial transactions
            </p>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Columns className="size-4" />
                  <span className="hidden lg:inline">Columns</span>
                  <ChevronDown className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    column =>
                      typeof column.accessorFn !== 'undefined' &&
                      column.getCanHide(),
                  )
                  .map(column => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={value =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-card rounded-lg border p-4">
            <div className="text-muted-foreground text-sm font-medium">
              Total Income
            </div>
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              +${totalIncome.toFixed(2)}
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-muted-foreground text-sm font-medium">
              Total Expenses
            </div>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              -${totalExpenses.toFixed(2)}
            </div>
          </div>
          <div className="bg-card rounded-lg border p-4">
            <div className="text-muted-foreground text-sm font-medium">
              Net Balance
            </div>
            <div
              className={`text-2xl font-bold ${totalIncome - totalExpenses >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}
            >
              ${(totalIncome - totalExpenses).toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
          id={sortableId}
        >
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                <SortableContext
                  items={dataIds}
                  strategy={verticalListSortingStrategy}
                >
                  {table.getRowModel().rows.map(row => (
                    <DraggableRow key={row.id} row={row} />
                  ))}
                </SortableContext>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>

      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
              Rows per page
            </Label>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={value => {
                table.setPageSize(Number(value))
              }}
            >
              <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function TransactionViewer({ item }: { item: z.infer<typeof schema> }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          variant="link"
          className="text-foreground w-fit px-0 text-left font-medium"
        >
          {item.header}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item.header}</DrawerTitle>
          <DrawerDescription>
            Transaction details and information
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 pb-4 text-sm">
          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="header">Transaction Name</Label>
              <Input id="header" defaultValue={item.header} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Category</Label>
                <Select defaultValue={item.type}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Entertainment">Entertainment</SelectItem>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Bills">Bills</SelectItem>
                    <SelectItem value="Travel">Travel</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Transfer">Transfer</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  defaultValue={item.amount}
                  type="number"
                  step="0.01"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="card">Card</Label>
                <Input id="card" defaultValue={item.card} />
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="date">Date</Label>
                <Input id="date" defaultValue={item.date} type="date" />
              </div>
            </div>
          </form>
        </div>
        <DrawerFooter>
          <Button>Save Changes</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default DataTable
