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
                className="relative flex items-center gap-2 text-xl font-extrabold tracking-widest"
              >
                <svg
                  className="!h-10 !w-10"
                  viewBox="0 0 69 54"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.4799 3.60286C22.8517 3.05176 23.473 2.72144 24.1378 2.72144H47.9989C49.6013 2.72144 50.5531 4.51166 49.6569 5.84001L31.2654 33.0999C30.8936 33.651 30.2722 33.9813 29.6074 33.9813H5.74634C4.14394 33.9813 3.19219 32.1911 4.08839 30.8627L22.4799 3.60286Z"
                    fill="white"
                  />
                  <path
                    d="M25.394 36.8784C24.7292 36.8784 24.1078 37.2088 23.736 37.7599L18.266 45.8676C17.3698 47.196 18.3215 48.9862 19.9239 48.9862H45.1458C45.8106 48.9862 46.4319 48.6559 46.8037 48.1048L65.1952 20.8449C66.0914 19.5165 65.1397 17.7263 63.5373 17.7263H46.1859C45.5211 17.7263 44.8998 18.0566 44.528 18.6077L32.7958 35.997C32.424 36.5481 31.8027 36.8784 31.1379 36.8784H25.394Z"
                    fill="var(--primary)"
                  />
                </svg>
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
