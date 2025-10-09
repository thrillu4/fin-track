'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/lib/routes'
import {
  BadgeDollarSign,
  ChartColumn,
  CreditCard,
  HandCoins,
  House,
  UserRound,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function NavMain() {
  const tabs = [
    {
      title: 'Dashboard',
      url: ROUTES.DASHBOARD,
      icon: House,
    },
    {
      title: 'Transactions',
      url: ROUTES.TRANSACTIONS,
      icon: BadgeDollarSign,
    },
    {
      title: 'Accounts',
      url: ROUTES.ACCOUNTS,
      icon: UserRound,
    },
    {
      title: 'Investments',
      url: ROUTES.INVESTMENTS,
      icon: ChartColumn,
    },
    {
      title: 'Credit Cards',
      url: ROUTES.CREDIT_CARDS,
      icon: CreditCard,
    },
    {
      title: 'Loans',
      url: ROUTES.LOANS,
      icon: HandCoins,
    },
  ]
  const pathName = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {tabs.map(tab => (
            <SidebarMenuItem key={tab.title}>
              <Link href={tab.url} className="w-full">
                <SidebarMenuButton
                  tooltip={tab.title}
                  className={` ${
                    pathName === tab.url
                      ? 'border-primary text-primary border-l-8'
                      : ''
                  } cursor-pointer text-base font-medium`}
                >
                  {tab.icon && <tab.icon />}
                  <span>{tab.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
