import DemoUserButton from '@/components/Landing/DemoUserButton'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

export default function HowItWorks() {
  const steps = [
    {
      title: 'Create an Account or Try Demo',
      desc: 'Sign up in just a few clicks to start using your personal dashboard.',
      icon: '📝',
    },
    {
      title: 'Explore Dashboard',
      desc: 'Access smart analytics, charts, and tools to manage your finances effectively.',
      icon: '📊',
    },
    {
      title: 'Manage Your Finances',
      desc: 'Track your expenses, monitor statistics, and plan ahead with ease.',
      icon: '💰',
    },
  ]

  return (
    <section className="min-h-[80vh] py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-4 text-4xl font-bold">How It Works</h2>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
          Just a few simple steps to start exploring your personal finance
          dashboard.
        </p>

        <div className="grid grid-cols-3 gap-15">
          {steps.map((step, i) => (
            <div
              key={step.title}
              className="relative flex min-h-[320px] flex-col items-center justify-center space-y-4 rounded-2xl bg-gray-50 p-6 text-center shadow dark:bg-gray-800"
            >
              <div className="mb-15 text-5xl">{step.icon}</div>
              <span className="absolute -top-4 -left-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                {i + 1}
              </span>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center gap-4">
          <Link href={ROUTES.SIGN_UP}>
            <Button className="cursor-pointer rounded-full bg-[#0601F6] px-9 py-7 text-lg hover:bg-[#0601F6]/80 dark:text-white">
              Create Account
            </Button>
          </Link>
          <DemoUserButton classname="rounded-full bg-gray-200 px-9 py-7 text-lg  text-gray-800 shadow transition cursor-pointer hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Try Demo
          </DemoUserButton>
        </div>
      </div>
    </section>
  )
}
