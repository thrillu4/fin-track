'use client'
import { ROUTES } from '@/lib/routes'
import { signIn } from 'next-auth/react'
import { Button } from '../ui/button'

const DemoUserButton = ({
  children,
  classname,
}: {
  children: React.ReactNode
  classname: string
}) => {
  return (
    <Button
      onClick={() =>
        signIn('credentials', {
          email: 'demo1@demo.com',
          password: '123321123',
          redirect: true,
          callbackUrl: ROUTES.DASHBOARD,
        })
      }
      className={classname}
    >
      {children}
    </Button>
  )
}

export default DemoUserButton
