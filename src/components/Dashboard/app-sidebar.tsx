import * as React from 'react'

import { auth } from '@/auth'
import { NavMain } from '@/components/Dashboard/nav-main'
import { NavSecondary } from '@/components/Dashboard/nav-secondary'
import { NavUser } from '@/components/Dashboard/nav-user'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const user = await auth()
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link
                href={ROUTES.DASHBOARD}
                className="relative flex items-center gap-2 text-xl font-bold tracking-widest"
              >
                <Image
                  src={'/dash/logo.png'}
                  alt="Logo"
                  width={35}
                  height={35}
                />
                FinTracker
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSecondary className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user?.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
