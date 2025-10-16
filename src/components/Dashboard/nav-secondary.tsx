'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { ROUTES } from '@/lib/routes'
import { CircleQuestionMark, Search } from 'lucide-react'
import Link from 'next/link'
import { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import SearchCommandDialog from './Help/SearchCommandDialog'

export function NavSecondary({
  ...props
}: ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const [open, setOpen] = useState(false)
  const { isMobile, setOpenMobile } = useSidebar()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                if (isMobile) {
                  setOpenMobile(false)
                }
              }}
              asChild
            >
              <Link href={ROUTES.HELP}>
                <div className="flex items-center gap-2 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
                  <CircleQuestionMark />
                  <span>Get Help</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="justify-between" asChild>
              <button onClick={() => setOpen(true)}>
                <div className="flex items-center gap-2 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0">
                  <Search />
                  <span>Search</span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Press{' '}
                  <kbd className="bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                    <span className="text-xs">Ctrl</span> + K
                  </kbd>
                </p>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchCommandDialog open={open} setOpen={setOpen} />
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
