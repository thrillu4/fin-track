import { LoginForm } from '@/components/login-form'
import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'

export default function SignUp() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link
            href={ROUTES.HOME}
            className="relative h-10 w-full max-w-[139px]"
          >
            <Image
              src={'/landing/logo.png'}
              fill
              alt="logo"
              className="object-contain"
            />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={'/sign-up.jpg'}
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
