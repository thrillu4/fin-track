import { pricing } from '@/lib/fake-data'
import { ROUTES } from '@/lib/routes'
import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const Pricing = () => {
  return (
    <section className="py-18" id="pricing">
      <div className="mb-3 text-center font-bold text-indigo-600">PRICING</div>
      <h3 className="text-center text-3xl font-bold lg:text-5xl">
        We got a price for <br />
        Everyone
      </h3>
      <div className="mx-auto mt-25 grid max-w-lg grid-cols-1 gap-10 lg:max-w-full lg:grid-cols-2 xl:grid-cols-3 dark:text-black">
        {pricing.map(plan => (
          <div key={plan.name} className="rounded-4xl bg-indigo-50 px-9 py-11">
            <div className="text-2xl font-bold">{plan.name}</div>
            <div className="mt-4 text-4xl">
              <span className="font-bold">{plan.price}</span>/month
            </div>
            <div className="mt-5 font-bold">What&#39;s included</div>
            <ul className="mt-6 space-y-4 font-semibold text-gray-600">
              {plan.features.map(feature => (
                <li key={feature} className="flex gap-3">
                  <CircleCheck className="min-w-6 text-indigo-700" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="mt-10 w-full cursor-pointer rounded-full bg-indigo-600 py-8 text-lg font-bold hover:bg-indigo-600/80 dark:text-white">
                Get Started
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing
