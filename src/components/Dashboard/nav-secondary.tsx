'use client'

import * as React from 'react'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { CircleQuestionMark, Search, Settings } from 'lucide-react'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

export function NavSecondary({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const navSecondary = [
    {
      title: 'Settings',
      url: ROUTES.SETTINGS,
      icon: Settings,
    },
    {
      title: 'Get Help',
      url: ROUTES.HELP,
      icon: CircleQuestionMark,
    },
    {
      title: 'Search',
      url: '#',
      icon: Search,
    },
  ]
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {navSecondary.map(item => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
