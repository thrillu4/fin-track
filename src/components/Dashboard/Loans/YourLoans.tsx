'use client'

import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { deleteLoan, repayLoan } from '@/lib/actions/loansOperations'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface Loan {
  id: string
  loanType: string
  amount: number
  interestRate: number
  balance: number
  startDate: Date
  dueDate: Date
  status: string
  userId?: string
  createdAt?: Date
}

const YourLoans = ({ data }: { data: Loan[] }) => {
  const [loans, setLoans] = useState<Loan[]>(data)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Loan
    direction: 'asc' | 'desc'
  } | null>(null)

  const sortedLoans = [...loans]
  if (sortConfig !== null) {
    sortedLoans.sort((a, b) => {
      const valA = a[sortConfig.key]
      const valB = b[sortConfig.key]
      if (valA && valB && valA < valB)
        return sortConfig.direction === 'asc' ? -1 : 1
      if (valA && valB && valA > valB)
        return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }

  const requestSort = (key: keyof Loan) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig?.key === key && sortConfig.direction === 'asc')
      direction = 'desc'
    setSortConfig({ key, direction })
  }

  const getSortIcon = (key: keyof Loan) => {
    if (sortConfig?.key !== key) return null
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="inline- ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="inline- ml-1 h-4 w-4" />
    )
  }

  const handleDelete = async (id: string) => {
    await deleteLoan(id)
    setLoans(loans.filter(l => l.id !== id))
  }

  const handleRepay = async (id: string) => {
    await repayLoan(id)
    setLoans(
      loans.map(l => (l.id === id ? { ...l, status: 'paid', balance: 0 } : l)),
    )
  }

  const totalAmount = loans.reduce((acc, l) => acc + l.amount, 0)
  const totalBalance = loans.reduce((acc, l) => acc + l.balance, 0)

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            onClick={() => requestSort('loanType')}
            className="hidden cursor-pointer sm:table-cell"
          >
            Type {getSortIcon('loanType')}
          </TableHead>
          <TableHead
            onClick={() => requestSort('amount')}
            className="cursor-pointer"
          >
            Amount {getSortIcon('amount')}
          </TableHead>
          <TableHead
            onClick={() => requestSort('interestRate')}
            className="hidden cursor-pointer sm:table-cell"
          >
            Interest % {getSortIcon('interestRate')}
          </TableHead>
          <TableHead
            onClick={() => requestSort('balance')}
            className="cursor-pointer"
          >
            Balance {getSortIcon('balance')}
          </TableHead>
          <TableHead
            onClick={() => requestSort('startDate')}
            className="hidden cursor-pointer lg:table-cell"
          >
            Start Date {getSortIcon('startDate')}
          </TableHead>
          <TableHead
            onClick={() => requestSort('dueDate')}
            className="hidden cursor-pointer sm:table-cell"
          >
            Due Date {getSortIcon('dueDate')}
          </TableHead>
          <TableHead
            onClick={() => requestSort('status')}
            className="hidden cursor-pointer sm:table-cell"
          >
            Status {getSortIcon('status')}
          </TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedLoans.map(loan => (
          <TableRow key={loan.id}>
            <TableCell className="hidden font-medium sm:table-cell">
              {loan.loanType}
            </TableCell>
            <TableCell>${loan.amount.toFixed(2)}</TableCell>
            <TableCell className="hidden sm:table-cell">
              {loan.interestRate}%
            </TableCell>
            <TableCell>${loan.balance.toFixed(2)}</TableCell>
            <TableCell className="hidden lg:table-cell">
              {new Date(loan.startDate).toLocaleDateString()}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              {new Date(loan.dueDate).toLocaleDateString()}
            </TableCell>
            <TableCell
              className={`hidden sm:table-cell ${
                loan.status === 'paid'
                  ? 'text-green-600'
                  : loan.status === 'overdue'
                    ? 'text-red-600'
                    : 'text-yellow-600'
              } `}
            >
              {loan.status}
            </TableCell>
            <TableCell className="flex gap-2">
              <Button
                size="sm"
                variant="destructive"
                className="hidden sm:flex"
                onClick={() => handleDelete(loan.id)}
              >
                Delete
              </Button>
              {loan.status !== 'paid' ? (
                <Button size="sm" onClick={() => handleRepay(loan.id)}>
                  Repay
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="destructive"
                  className="flex sm:hidden"
                  onClick={() => handleDelete(loan.id)}
                >
                  Delete
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
        <TableRow className="text-primary font-bold">
          <TableCell>Total</TableCell>
          <TableCell>${totalAmount.toFixed(2)}</TableCell>
          <TableCell className="hidden sm:table-cell"></TableCell>
          <TableCell>${totalBalance.toFixed(2)}</TableCell>
          <TableCell className="hidden sm:table-cell"></TableCell>
          <TableCell className="hidden sm:table-cell"></TableCell>
          <TableCell className="hidden sm:table-cell"></TableCell>
          <TableCell className="hidden sm:table-cell"></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default YourLoans
