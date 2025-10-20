import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GitHub from 'next-auth/providers/github'
import { prisma } from './lib/prisma'
import { ROUTES } from './lib/routes'
import { signInSchema } from './lib/zod'

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  providers: [
    GitHub,
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }
          const parsed = signInSchema.safeParse(credentials)
          if (!parsed.success) return null

          const { email, password } = parsed.data
          const user = await prisma.user.findUnique({
            where: { email },
          })
          if (!user || !user.password) {
            return null
          }
          const isValidPassword = await bcrypt.compare(password, user.password)
          if (!isValidPassword) {
            return null
          }
          return user
        } catch (error) {
          console.log('Authorize error:', error)
          return null
        }
      },
    }),
  ],
  pages: { signIn: ROUTES.SIGN_IN, signOut: ROUTES.HOME },
})
