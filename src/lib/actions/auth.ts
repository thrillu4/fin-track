'use server'

import { signIn, signOut } from '@/auth'
import { ROUTES } from '../routes'

export const login = async () =>
	await signIn('github', { redirectTo: ROUTES.DASHBOARD })

export const logout = async () => await signOut({ redirectTo: ROUTES.HOME })
