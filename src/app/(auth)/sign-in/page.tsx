import LoginForm from '@/components/Auth/LoginForm'
import Logo from '@/components/Landing/Logo'
import Image from 'next/image'

export default async function SignIn() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src={'/sign-in.jpg'}
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  )
}
