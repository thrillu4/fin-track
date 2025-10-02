import { pricing } from '@/lib/fake-data'
import { ROUTES } from '@/lib/routes'
import { CircleCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

const Pricing = () => {
  return (
    <section className="mt-14 py-18" id="pricing">
      <div className="mb-3 text-center font-bold text-blue-600">PRICING</div>
      <h3 className="text-center text-5xl font-bold">
        We got a price for <br />
        Everyone
      </h3>
      <div className="mt-25 grid grid-cols-3 gap-10 dark:text-black">
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
                  <CircleCheck className="min-w-6 text-blue-700" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href={ROUTES.SIGN_UP}>
              <Button className="mt-10 w-full rounded-full bg-[#0601F6] py-8 text-lg font-bold hover:bg-[#0601F6]/80 dark:text-white">
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
