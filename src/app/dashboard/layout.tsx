import { ActiveThemeProvider } from '@/components/Dashboard/active-theme'
import { AppSidebar } from '@/components/Dashboard/app-sidebar'
import { SiteHeader } from '@/components/Dashboard/site-header'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'
import { cookies } from 'next/headers'

const layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  const cookieStore = await cookies()
  const activeThemeValue = cookieStore.get('active_theme')?.value
  const isScaled = activeThemeValue?.endsWith('-scaled')
  return (
    <div
      className={cn(
        'bg-background overscroll-none font-sans antialiased',
        activeThemeValue ? `theme-${activeThemeValue}` : '',
        isScaled ? 'theme-scaled' : '',
      )}
    >
      <ActiveThemeProvider initialTheme={activeThemeValue}>
        <SidebarProvider
          style={
            {
              '--sidebar-width': 'calc(var(--spacing) * 72)',
              '--header-height': 'calc(var(--spacing) * 12)',
            } as React.CSSProperties
          }
        >
          <AppSidebar variant="inset" />
          <SidebarInset>
            <SiteHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </ActiveThemeProvider>
    </div>
  )
}

export default layout
