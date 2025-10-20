import { auth } from '@/auth'
import RegisterForm from '@/components/Auth/RegisterForm'
import Logo from '@/components/Landing/Logo'
import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import { redirect } from 'next/navigation'

export default async function SignUp() {
  const session = await auth()

  if (session) redirect(ROUTES.DASHBOARD)

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={'/sign-up.jpg'}
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
