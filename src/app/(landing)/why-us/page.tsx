import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/routes'
import Link from 'next/link'

export default function WhyUs() {
  const features = [
    {
      title: 'Secure & Reliable',
      desc: 'Your financial data is always safe with us.',
      icon: '🔒',
    },
    {
      title: 'Smart Analytics',
      desc: 'Visual reports and insights to manage your expenses.',
      icon: '📊',
    },
    {
      title: 'Fast & Easy',
      desc: 'Simple interface and lightning-fast performance.',
      icon: '⚡',
    },
    {
      title: 'Access Anywhere',
      desc: 'Track your finances from any device, anytime.',
      icon: '🌍',
    },
    {
      title: 'Customer Support',
      desc: 'We’re here to help you 24/7.',
      icon: '🤝',
    },
  ]

  return (
    <section className="min-h-screen py-20">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="mb-4 text-4xl font-bold">Why Choose Us?</h2>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">
          We provide modern financial tools that make money management simple,
          secure, and effective.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(f => (
            <div
              key={f.title}
              className="flex flex-col items-center rounded-2xl bg-white p-6 text-center shadow-md dark:bg-gray-800"
            >
              <div className="mb-4 text-5xl">{f.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link href={ROUTES.SIGN_UP}>
            <Button className="rounded-full px-10 py-7 text-lg">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
