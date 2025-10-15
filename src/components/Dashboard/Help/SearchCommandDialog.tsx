'use client'

import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { searchDashboard } from '@/lib/actions/searchDashboard'
import { ROUTES } from '@/lib/routes'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface SearchResult {
  pages: { label: string; url: string }[]
  transactions: {
    id: string
    userId: string
    currency: string
    accountId: string | null
    cardId: string | null
    type: string
    category: string | null
    amount: number
    description: string | null
    date: Date
  }[]
  accounts: {
    id: string
    createdAt: Date
    userId: string
    bankName: string
    accountType: string
    accountNumber: string
    balance: number
    currency: string
  }[]
  cards: {
    id: string
    createdAt: Date
    userId: string
    balance: number
    accountId: string
    cardNumber: string
    cardType: string
    cardBrand: string | null
    expiryMonth: number
    expiryYear: number
    cvv: string
  }[]
  investments: {
    name: string
    id: string
    createdAt: Date
    userId: string
    currency: string
    type: string
    amountInvested: number
    currentValue: number
    profitLoss: number
  }[]
  loans: {
    id: string
    createdAt: Date
    userId: string
    balance: number
    amount: number
    status: string
    dueDate: Date
    loanType: string
    interestRate: number
    startDate: Date
  }[]
}

const SearchCommandDialog = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}) => {
  const [results, setResults] = useState<SearchResult>({
    pages: [],
    transactions: [],
    accounts: [],
    cards: [],
    investments: [],
    loans: [],
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setLoading(true)
    const fillCommand = async () => {
      const res = await searchDashboard()
      setResults(res)
      setLoading(false)
    }
    fillCommand()
  }, [])

  const handleSelect = (url: string) => {
    router.push(url)
    setOpen(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        {loading ? (
          <div className="p-4 text-center text-sm">Loading...</div>
        ) : (
          <>
            {results.pages.length > 0 && (
              <CommandGroup heading="Pages">
                {results.pages.map(page => (
                  <CommandItem
                    key={page.url}
                    onSelect={() => handleSelect(page.url)}
                  >
                    📄 {page.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.transactions.length > 0 && (
              <CommandGroup heading="Transactions">
                {results.transactions.map(tx => (
                  <CommandItem
                    key={tx.id}
                    onSelect={() => handleSelect(ROUTES.TRANSACTIONS)}
                  >
                    💸 {tx.description || 'No description'} - {tx.amount}$
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.accounts.length > 0 && (
              <CommandGroup heading="Accounts">
                {results.accounts.map(acc => (
                  <CommandItem
                    key={acc.id}
                    onSelect={() => handleSelect(ROUTES.ACCOUNTS)}
                  >
                    🏦 {acc.bankName} (Balance: {acc.balance}$)
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.cards.length > 0 && (
              <CommandGroup heading="Cards">
                {results.cards.map(c => (
                  <CommandItem
                    key={c.id}
                    onSelect={() => handleSelect(ROUTES.CREDIT_CARDS)}
                  >
                    💳 {c.cardBrand || 'Card'} ****{c.cardNumber.slice(-4)}{' '}
                    (Balance: {c.balance}$)
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.investments.length > 0 && (
              <CommandGroup heading="Investments">
                {results.investments.map(inv => (
                  <CommandItem
                    key={inv.id}
                    onSelect={() => handleSelect(ROUTES.INVESTMENTS)}
                  >
                    📈 {inv.name} (Profit/Loss: {inv.profitLoss}$)
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {results.loans.length > 0 && (
              <CommandGroup heading="Loans">
                {results.loans.map(loan => (
                  <CommandItem
                    key={loan.id}
                    onSelect={() => handleSelect(ROUTES.LOANS)}
                  >
                    💰 {loan.loanType} (Balance: {loan.balance}$)
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  )
}

export default SearchCommandDialog
