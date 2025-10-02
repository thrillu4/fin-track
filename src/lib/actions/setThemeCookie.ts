'use server'

import { cookies } from 'next/headers'

export const setThemeCookie = async (theme: string) => {
  ;(await cookies()).set('active_theme', theme)
}
