import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="mt-20 border-t bg-black px-2 py-10 text-white">
      <div className="container mx-auto flex justify-between gap-10">
        <div className="hidden max-w-60 lg:block">
          <div className="relative h-20 w-full">
            <Image
              src={'/landing/footer-logo.png'}
              alt="logo"
              className="object-contain"
              fill
            />
          </div>
          <p className="mt-4 text-sm text-gray-400">
            The only Financial Companion you would ever need.
          </p>
        </div>
        <div className="flex w-full justify-between lg:justify-end lg:gap-28">
          <div>
            <div className="text-bold mb-8 text-lg">Product</div>
            <ul className="space-y-6 text-gray-400">
              <li>
                <Link
                  className="transition duration-200 hover:underline"
                  href={ROUTES.HOW_IT_WORKS}
                >
                  How It Works?
                </Link>
              </li>
              <li>
                <Link
                  className="transition duration-200 hover:underline"
                  href={`${ROUTES.HOME}#pricing`}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  className="transition duration-200 hover:underline"
                  href={ROUTES.SIGN_UP}
                >
                  Get Started
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-bold mb-8 text-lg">Company</div>
            <ul className="space-y-6 text-gray-400">
              <li>
                <Link
                  className="transition duration-200 hover:underline"
                  href={ROUTES.WHO_WE_ARE}
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  className="transition duration-200 hover:underline"
                  href={ROUTES.WHY_US}
                >
                  Why Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-bold mb-8 text-lg">Follow Us</div>
            <ul className="flex flex-col space-y-6 text-gray-400">
              <li>
                <Link
                  href="https://www.instagram.com/"
                  className="transition duration-200 hover:underline"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/"
                  className="transition duration-200 hover:underline"
                >
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.facebook.com/"
                  className="transition duration-200 hover:underline"
                >
                  Facebook
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-30 justify-between space-y-5 border-t border-t-gray-400 pt-10 text-center text-sm text-gray-400 lg:flex lg:space-y-0">
        <div className="flex justify-center lg:justify-between">
          <div className="flex items-center gap-8 text-xs lg:text-base">
            <div>Privacy Policy</div> | <div>Terms & Conditions</div> |{' '}
            <div>Cookie Policy</div>
          </div>
        </div>
        <div className="">© 2025 FinTracker. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default Footer
