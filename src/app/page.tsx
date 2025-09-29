import NavBar from '@/components/LandingPage/NavBar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { ArrowRight, Check, CircleCheck } from 'lucide-react'
import Image from 'next/image'

export default async function Home() {
  const pricing = [
    {
      name: 'Starter',
      price: 'Free',
      features: [
        'Track up to 2 accounts (bank cards, cash, wallets)',
        'Monthly income & expense tracking',
        'Basic transaction categories',
        'Export to CSV',
      ],
    },
    {
      name: 'Standard',
      price: '$9.99',
      features: [
        'Track up to 10 accounts',
        'Advanced budgeting tools (goals, limits, reminders)',
        'Smart insights & spending reports',
        'Email support',
      ],
    },
    {
      name: 'Premium',
      price: '$19.99',
      features: [
        'Unlimited accounts & transactions',
        'Investment & savings tracking',
        'AI-powered financial insights & forecasting',
        'Priority 24/7 support',
      ],
    },
  ]

  const testimonials = [
    {
      name: 'John Doe',
      role: 'Entrepreneur',
      image: '/landing/testimonials/test1.png',
      text: "I've been using FinTracker for a few months now, and it has completely changed the way I manage my finances. The app is easy to use, and the features are incredibly helpful. I especially love the budgeting tools and the ability to track my investments all in one place.",
    },
    {
      name: 'Jane Smith',
      role: 'Investor',
      image: '/landing/testimonials/test2.png',
      text: "FinTracker is hands down the best financial management app I've ever used. The interface is sleek and intuitive, and the features are top-notch. I love being able to see all of my accounts in one place and track my spending with ease. Highly recommend!",
    },
    {
      name: 'Alice Johnson',
      role: 'Freelancer',
      image: '/landing/testimonials/test3.png',
      text: "FinTracker has completely transformed the way I manage my finances. The intuitive interface and powerful features make it easy to track my expenses, set budgets, and monitor my investments. It's like having a personal financial advisor in my pocket!",
    },
    {
      name: 'Bob Brown',
      role: 'Small Business Owner',
      image: '/landing/testimonials/test4.png',
      text: 'As a small business owner, FinTracker has been a game-changer for managing my finances. The ability to track expenses, generate reports, and stay on top of my cash flow has made running my business so much easier.',
    },
    {
      name: 'Eve Davis',
      role: 'Consultant',
      image: '/landing/testimonials/test.png',
      text: 'FinTracker has transformed the way I manage my finances. The intuitive interface and powerful features make budgeting and tracking expenses a breeze. Highly recommended!',
    },
  ]

  return (
    <>
      <NavBar />
      <main className="container mx-auto">
        <div className="py-14">
          <Image
            src={'/landing/promo.png'}
            alt="promo"
            width={800}
            height={600}
            className="mx-auto"
          />
          <h1 className="mx-auto max-w-[600px] text-center text-6xl font-bold">
            Manage your finance with{' '}
            <span className="text-blue-600">FinTracker</span>
          </h1>
          <p className="mx-auto mt-8 max-w-[600px] text-center text-gray-600">
            Dashboard platform designed with the aim of making it easier for you
            to manage your finances and stocks all in one place. With amazing
            customizing capabilities, you are your only limit!
          </p>
          <Button className="mx-auto mt-8 flex px-7 py-5 text-lg">
            Get Started
          </Button>
        </div>

        <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-teal-50 px-26 py-18">
          <div className="max-w-sm space-y-6">
            <div className="inline-flex items-center justify-center rounded-2xl bg-teal-100 p-4">
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.46154 13.75H0.923077C0.413538 13.75 0 14.1607 0 14.6667V21.0833C0 21.5893 0.413538 22 0.923077 22H6.46154C6.97108 22 7.38462 21.5893 7.38462 21.0833V14.6667C7.38462 14.1607 6.97108 13.75 6.46154 13.75ZM6.46154 6.41667H0.923077C0.413538 6.41667 0 6.82733 0 7.33333V11.9167C0 12.4227 0.413538 12.8333 0.923077 12.8333H6.46154C6.97108 12.8333 7.38462 12.4227 7.38462 11.9167V7.33333C7.38462 6.82733 6.97108 6.41667 6.46154 6.41667ZM14.7692 0H9.23077C8.72123 0 8.30769 0.410667 8.30769 0.916667V8.25C8.30769 8.756 8.72123 9.16667 9.23077 9.16667H14.7692C15.2788 9.16667 15.6923 8.756 15.6923 8.25V0.916667C15.6923 0.410667 15.2788 0 14.7692 0ZM14.7692 10.0833H9.23077C8.72123 10.0833 8.30769 10.494 8.30769 11V14.6667C8.30769 15.1727 8.72123 15.5833 9.23077 15.5833H14.7692C15.2788 15.5833 15.6923 15.1727 15.6923 14.6667V11C15.6923 10.494 15.2788 10.0833 14.7692 10.0833ZM23.0769 14.6667H17.5385C17.0289 14.6667 16.6154 15.0773 16.6154 15.5833V21.0833C16.6154 21.5893 17.0289 22 17.5385 22H23.0769C23.5865 22 24 21.5893 24 21.0833V15.5833C24 15.0773 23.5865 14.6667 23.0769 14.6667ZM23.0769 0H17.5385C17.0289 0 16.6154 0.410667 16.6154 0.916667V5.5C16.6154 6.006 17.0289 6.41667 17.5385 6.41667H23.0769C23.5865 6.41667 24 6.006 24 5.5V0.916667C24 0.410667 23.5865 0 23.0769 0ZM7.38462 0.458333C7.38462 0.711333 7.17785 0.916667 6.92308 0.916667H0.461538C0.206769 0.916667 0 0.711333 0 0.458333C0 0.205333 0.206769 0 0.461538 0H6.92308C7.17785 0 7.38462 0.205333 7.38462 0.458333ZM7.38462 2.29167C7.38462 2.54467 7.17785 2.75 6.92308 2.75H0.461538C0.206769 2.75 0 2.54467 0 2.29167C0 2.03867 0.206769 1.83333 0.461538 1.83333H6.92308C7.17785 1.83333 7.38462 2.03867 7.38462 2.29167ZM7.38462 4.125C7.38462 4.378 7.17785 4.58333 6.92308 4.58333H0.461538C0.206769 4.58333 0 4.378 0 4.125C0 3.872 0.206769 3.66667 0.461538 3.66667H6.92308C7.17785 3.66667 7.38462 3.872 7.38462 4.125ZM15.6923 17.875C15.6923 18.128 15.4855 18.3333 15.2308 18.3333H8.76923C8.51446 18.3333 8.30769 18.128 8.30769 17.875C8.30769 17.622 8.51446 17.4167 8.76923 17.4167H15.2308C15.4855 17.4167 15.6923 17.622 15.6923 17.875ZM15.6923 19.7083C15.6923 19.9613 15.4855 20.1667 15.2308 20.1667H8.76923C8.51446 20.1667 8.30769 19.9613 8.30769 19.7083C8.30769 19.4553 8.51446 19.25 8.76923 19.25H15.2308C15.4855 19.25 15.6923 19.4553 15.6923 19.7083ZM15.6923 21.5417C15.6923 21.7947 15.4855 22 15.2308 22H8.76923C8.51446 22 8.30769 21.7947 8.30769 21.5417C8.30769 21.2887 8.51446 21.0833 8.76923 21.0833H15.2308C15.4855 21.0833 15.6923 21.2887 15.6923 21.5417ZM24 8.70833C24 8.96133 23.7932 9.16667 23.5385 9.16667H17.0769C16.8222 9.16667 16.6154 8.96133 16.6154 8.70833C16.6154 8.45533 16.8222 8.25 17.0769 8.25H23.5385C23.7932 8.25 24 8.45533 24 8.70833ZM24 10.5417C24 10.7947 23.7932 11 23.5385 11H17.0769C16.8222 11 16.6154 10.7947 16.6154 10.5417C16.6154 10.2887 16.8222 10.0833 17.0769 10.0833H23.5385C23.7932 10.0833 24 10.2887 24 10.5417ZM24 12.375C24 12.628 23.7932 12.8333 23.5385 12.8333H17.0769C16.8222 12.8333 16.6154 12.628 16.6154 12.375C16.6154 12.122 16.8222 11.9167 17.0769 11.9167H23.5385C23.7932 11.9167 24 12.122 24 12.375Z"
                  fill="#A2CBCB"
                />
              </svg>
            </div>
            <div className="text-sm font-bold text-teal-100">
              FINANCIAL CLEAN-UP
            </div>
            <h3 className="text-4xl font-bold">
              Get organize all of your finances
            </h3>
            <p className="opacity-50">
              Spending only what you have is not a sustainable way to get by.
              Put money aside for emergencies, building up your savings account
              and taking advantage of opportunities for rewards are all steps
              that
            </p>
            <Button
              variant={'link'}
              className="flex px-7 py-5 text-lg font-bold text-teal-600"
            >
              Get Started <ArrowRight />
            </Button>
          </div>
          <div className="relative h-120 w-full max-w-lg rounded-3xl">
            <Image
              src={'/landing/finance.png'}
              alt="finance organizer"
              fill
              className="object-cover"
            />
          </div>
        </section>

        <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-[#EDEEFC] px-26 pt-18">
          <div className="relative h-120 w-[350px]">
            <Image
              src={'/landing/iphone.png'}
              alt="iphone app"
              fill
              className="object-cover"
            />
          </div>
          <div className="mb-15 max-w-sm space-y-6">
            <div className="inline-flex items-center justify-center rounded-2xl bg-indigo-100 p-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_407_2036)">
                  <path
                    d="M22.7826 21.5375H2.43478V1.24522C2.43478 0.572875 1.88974 0.027832 1.21739 0.027832C0.545043 0.027832 0 0.572875 0 1.24522V22.7549C0 23.4273 0.545043 23.9723 1.21739 23.9723H22.7826C23.455 23.9723 24 23.4273 24 22.7549C24 22.0826 23.455 21.5375 22.7826 21.5375Z"
                    fill="#A6A5E1"
                  />
                  <path
                    d="M5.25562 16.3446C5.58515 16.3446 5.91357 16.2116 6.15371 15.9495L9.5446 12.2471L15.6099 14.911C16.1317 15.1401 16.7428 14.9766 17.0803 14.5174L20.8012 9.45561L21.1138 11.6345C21.2009 12.2414 21.7215 12.6793 22.3173 12.6792C22.3749 12.6792 22.4332 12.6751 22.4917 12.6667C23.1572 12.5712 23.6193 11.9543 23.5239 11.2888L22.7847 6.13498C22.6892 5.46945 22.0721 5.00754 21.4068 5.10277L16.253 5.84197C15.5875 5.93741 15.1253 6.55432 15.2208 7.21985C15.3163 7.88538 15.9333 8.34757 16.5987 8.25206L18.9076 7.92093L15.6962 12.2896L9.72533 9.66715C9.24804 9.45755 8.6902 9.57512 8.33806 9.95954L4.35823 14.3049C3.90411 14.8007 3.93792 15.5708 4.43371 16.0249C4.66738 16.239 4.96199 16.3446 5.25562 16.3446Z"
                    fill="#A6A5E1"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_407_2036">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="text-sm font-bold text-[#A6A5E1]">ASSISTANCE</div>
            <h3 className="text-4xl font-bold">
              Your digital financial assistance
            </h3>
            <p className="opacity-50">
              Have a dedicated watchlist for your desired stocks, we will help
              you make informed decisions and help you gain high profits. We
              will provide alerts and trackers for specific price ranges you are
              looking for
            </p>
            <Button
              variant={'link'}
              className="flex px-7 py-5 text-lg font-bold text-[#7175B8]"
            >
              Get Started <ArrowRight />
            </Button>
          </div>
        </section>

        <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-orange-50">
          <div className="ml-36 max-w-lg space-y-6 py-18 font-bold">
            <div className="inline-flex items-center justify-center rounded-2xl bg-orange-100 p-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 1C11.7348 1 11.4804 1.10536 11.2929 1.29289C11.1054 1.48043 11 1.73478 11 2V12C11 12.5523 11.4477 13 12 13H22C22.5523 13 23 12.5523 23 12C23 10.5555 22.7155 9.12506 22.1627 7.79048C21.6099 6.4559 20.7996 5.24327 19.7782 4.22183C18.7567 3.20038 17.5441 2.39013 16.2095 1.83733C14.8749 1.28452 13.4445 1 12 1Z"
                  fill="#D7B7B7"
                />
                <path
                  d="M9 4.51221C9 4.18759 8.84243 3.88317 8.57739 3.69574C8.31235 3.50831 7.97282 3.46119 7.66675 3.56937C3.78413 4.94168 1 8.64447 1 13.0001C1 18.5229 5.47715 23.0001 11 23.0001C15.3556 23.0001 19.0584 20.2159 20.4307 16.3333C20.5389 16.0273 20.4918 15.6877 20.3044 15.4227C20.1169 15.1576 19.8125 15.0001 19.4879 15.0001H11C9.89543 15.0001 9 14.1046 9 13.0001V4.51221Z"
                  fill="#D7B7B7"
                />
              </svg>
            </div>
            <div className="text-sm font-bold text-orange-300">
              EVERYTHING TOGETHER
            </div>
            <h3 className="text-4xl font-bold">
              All and everything in one place
            </h3>
            <div>Organize yourself financially by:</div>
            <ul className="space-y-2">
              <li className="flex gap-3">
                <Check className="text-green-500" />
                Establishing an emergency fund to cover months of expenses;
              </li>
              <li className="flex gap-3">
                <Check className="text-green-500" />
                Separating your bank accounts;
              </li>
              <li className="flex gap-3">
                <Check className="text-green-500" /> Creating a budget;
              </li>
            </ul>
            <Button
              variant={'link'}
              className="flex px-7 py-5 text-lg font-bold text-orange-500"
            >
              Get Started <ArrowRight />
            </Button>
          </div>
          <div className="relative h-[630px] w-[600px]">
            <Image
              src={'/landing/charts.png'}
              alt="charts"
              fill
              className="object-contain"
            />
          </div>
        </section>

        <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-fuchsia-100 px-26 py-18">
          <div className="relative h-140 w-full max-w-xl">
            <Image
              src={'/landing/invoice.png'}
              alt="invoice organizer"
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-sm space-y-6">
            <div className="inline-flex items-center justify-center rounded-2xl bg-fuchsia-200 p-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.4 12H24V21.6C24 22.2365 23.7471 22.847 23.2971 23.2971C22.847 23.7471 22.2365 24 21.6 24H20.4V12ZM18 2.4V24H2.4C1.76348 24 1.15303 23.7471 0.702944 23.2971C0.252856 22.847 0 22.2365 0 21.6V2.4C0 1.76348 0.252856 1.15303 0.702944 0.702944C1.15303 0.252856 1.76348 0 2.4 0H15.6C16.2365 0 16.847 0.252856 17.2971 0.702944C17.7471 1.15303 18 1.76348 18 2.4ZM9.6 16.8H3.6V19.2H9.6V16.8ZM14.4 10.8H3.6V13.2H14.4V10.8ZM14.4 4.8H3.6V7.2H14.4V4.8Z"
                  fill="#9d3ba0"
                />
              </svg>
            </div>
            <div className="text-sm font-bold text-fuchsia-300">
              Personalize your invoicing
            </div>
            <h3 className="text-4xl font-bold">
              Invoicing like you never had before
            </h3>
            <p className="opacity-50">
              Up-to-the minute details about your invoices and your business
              processes are saved in its web interface. Plus, it has a contact
              us feature for customers and businesses.
            </p>
            <Button
              variant={'link'}
              className="flex px-7 py-5 text-lg font-bold text-fuchsia-500"
            >
              Get Started <ArrowRight />
            </Button>
          </div>
        </section>

        <section className="mt-14 py-18">
          <div className="mb-3 text-center font-bold text-blue-600">
            TESTIMONIALS
          </div>
          <h3 className="text-center text-5xl font-bold">
            What world says about us
          </h3>
          <Carousel
            opts={{
              loop: true,
            }}
            className="mt-15 h-full w-full overflow-x-hidden"
          >
            <CarouselContent className="py-10">
              {testimonials.map(test => (
                <CarouselItem
                  key={test.name}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="min-h-[450px] cursor-pointer select-none">
                    <CardContent className="flex h-full flex-col items-center justify-between gap-12 p-6">
                      <Image
                        src={'/landing/testimonials/up.png'}
                        alt="up-logo"
                        width={25}
                        height={25}
                      />
                      <q className="text-center font-semibold">{test.text}</q>
                      <div className="flex items-center">
                        <div className="relative h-14 w-14">
                          <Image
                            src={test.image}
                            alt={test.name}
                            fill
                            className="rounded-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-bold">{test.name}</div>
                          <div className="text-sm text-gray-500">
                            {test.role}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        <section className="mt-14 py-18">
          <div className="mb-3 text-center font-bold text-blue-600">
            PRICING
          </div>
          <h3 className="text-center text-5xl font-bold">
            We got a price for <br />
            Everyone
          </h3>
          <div className="mt-25 grid grid-cols-3 gap-10">
            {pricing.map(plan => (
              <div
                key={plan.name}
                className="rounded-4xl bg-indigo-50 px-9 py-11"
              >
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
                <Button className="mt-10 w-full rounded-full py-8 text-lg font-bold">
                  Get Started
                </Button>
              </div>
            ))}
          </div>
        </section>

        <section className="relative mt-14 rounded-4xl bg-gray-100 py-18">
          <h2 className="mx-auto max-w-[530px] text-center text-5xl font-bold">
            Let’s get you started with{' '}
            <span className="text-blue-600">FinTrack</span>!
          </h2>
          <p className="mx-auto mt-6 max-w-[530px] text-center text-gray-600">
            It only takes a few clicks and you can get started with managing
            your finances like a Professional.
          </p>
          <div>
            <Button className="mx-auto mt-10 flex rounded-full px-14 py-8 text-lg font-bold">
              Continue as Demo User
            </Button>
          </div>

          <svg
            className="absolute bottom-0 left-0 z-20"
            width="279"
            height="276"
            viewBox="0 0 279 276"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g style={{ mixBlendMode: 'color-dodge' }}>
              <g
                clipPath="url(#paint0_angular_60_5283_clip_path)"
                data-figma-skip-parse="true"
              >
                <g transform="matrix(1.08079e-08 0.162611 -0.162611 1.08079e-08 109.682 174.996)">
                  <foreignObject
                    x="-1077.35"
                    y="-1077.35"
                    width="2154.71"
                    height="2154.71"
                  >
                    <div
                      style={{
                        background:
                          'conic-gradient(from 90deg,#fdfafa 0deg,rgba(255, 255, 255, 0) 360deg)',
                        height: '100%',
                        width: '100%',
                        opacity: 1,
                      }}
                    ></div>
                  </foreignObject>
                </g>
              </g>
              <path
                d="M278.083 169.206C278.083 262.211 202.687 337.607 109.682 337.607C16.677 337.607 -58.7185 262.211 -58.7185 169.206C-58.7185 76.2012 16.677 0.805664 109.682 0.805664C202.687 0.805664 278.083 76.2012 278.083 169.206ZM37.4572 169.206C37.4572 209.095 69.7934 241.431 109.682 241.431C149.571 241.431 181.907 209.095 181.907 169.206C181.907 129.318 149.571 96.9814 109.682 96.9814C69.7934 96.9814 37.4572 129.318 37.4572 169.206Z"
                data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.0,&#34;g&#34;:0.0,&#34;b&#34;:0.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[],&#34;transform&#34;:{&#34;m00&#34;:2.1615864170598798e-05,&#34;m01&#34;:-325.22256469726562,&#34;m02&#34;:272.29339599609375,&#34;m10&#34;:325.22256469726562,&#34;m11&#34;:2.1615864170598798e-05,&#34;m12&#34;:12.384369850158691},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
              />
            </g>
            <defs>
              <clipPath id="paint0_angular_60_5283_clip_path">
                <path d="M278.083 169.206C278.083 262.211 202.687 337.607 109.682 337.607C16.677 337.607 -58.7185 262.211 -58.7185 169.206C-58.7185 76.2012 16.677 0.805664 109.682 0.805664C202.687 0.805664 278.083 76.2012 278.083 169.206ZM37.4572 169.206C37.4572 209.095 69.7934 241.431 109.682 241.431C149.571 241.431 181.907 209.095 181.907 169.206C181.907 129.318 149.571 96.9814 109.682 96.9814C69.7934 96.9814 37.4572 129.318 37.4572 169.206Z" />
              </clipPath>
            </defs>
          </svg>
          <svg
            className="absolute top-0 right-0 z-20"
            width="281"
            height="141"
            viewBox="0 0 281 141"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g style={{ mixBlendMode: 'color-dodge' }}>
              <g
                clip-path="url(#paint0_angular_60_5285_clip_path)"
                data-figma-skip-parse="true"
              >
                <g transform="matrix(0.130251 0.0354316 -0.0354316 0.130251 145.106 1.62081)">
                  <foreignObject
                    x="-1078.61"
                    y="-1078.61"
                    width="2157.23"
                    height="2157.23"
                  >
                    <div
                      style={{
                        background:
                          'conic-gradient(from 90deg,#ececec 0deg,rgba(255, 255, 255, 0) 360deg)',
                        height: '100%',
                        width: '100%',
                        opacity: 1,
                      }}
                    ></div>
                  </foreignObject>
                </g>
              </g>
              <path
                d="M177.162 -134.529C251.659 -114.264 295.623 -37.4444 275.357 37.0524C255.092 111.549 178.273 155.513 103.776 135.248C29.2793 114.983 -14.6843 38.1631 5.58074 -36.3337C25.8458 -110.83 102.665 -154.794 177.162 -134.529ZM124.732 58.2113C156.683 66.9027 189.63 48.0473 198.321 16.0965C207.012 -15.8542 188.157 -48.8012 156.206 -57.4926C124.256 -66.184 91.3086 -47.3286 82.6172 -15.3778C73.9258 16.5729 92.7812 49.5199 124.732 58.2113Z"
                data-figma-gradient-fill="{&#34;type&#34;:&#34;GRADIENT_ANGULAR&#34;,&#34;stops&#34;:[{&#34;color&#34;:{&#34;r&#34;:0.0,&#34;g&#34;:0.0,&#34;b&#34;:0.0,&#34;a&#34;:1.0},&#34;position&#34;:0.0},{&#34;color&#34;:{&#34;r&#34;:1.0,&#34;g&#34;:1.0,&#34;b&#34;:1.0,&#34;a&#34;:0.0},&#34;position&#34;:1.0}],&#34;stopsVar&#34;:[],&#34;transform&#34;:{&#34;m00&#34;:260.50222778320312,&#34;m01&#34;:-70.863174438476562,&#34;m02&#34;:50.286838531494141,&#34;m10&#34;:70.863174438476562,&#34;m11&#34;:260.50222778320312,&#34;m12&#34;:-164.06188964843750},&#34;opacity&#34;:1.0,&#34;blendMode&#34;:&#34;NORMAL&#34;,&#34;visible&#34;:true}"
              />
            </g>
            <defs>
              <clipPath id="paint0_angular_60_5285_clip_path">
                <path d="M177.162 -134.529C251.659 -114.264 295.623 -37.4444 275.357 37.0524C255.092 111.549 178.273 155.513 103.776 135.248C29.2793 114.983 -14.6843 38.1631 5.58074 -36.3337C25.8458 -110.83 102.665 -154.794 177.162 -134.529ZM124.732 58.2113C156.683 66.9027 189.63 48.0473 198.321 16.0965C207.012 -15.8542 188.157 -48.8012 156.206 -57.4926C124.256 -66.184 91.3086 -47.3286 82.6172 -15.3778C73.9258 16.5729 92.7812 49.5199 124.732 58.2113Z" />
              </clipPath>
            </defs>
          </svg>
        </section>
      </main>
      <footer className="mt-20 border-t bg-black py-10 text-white">
        <div className="container mx-auto flex justify-between gap-10">
          <div className="max-w-60">
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
          <div className="flex w-full justify-end gap-28 md:flex">
            <div>
              <div className="text-bold mb-8 text-lg">Product</div>
              <ul className="space-y-6 text-gray-400">
                <li>How It Works?</li>
                <li>Pricing</li>
                <li>Get Started</li>
              </ul>
            </div>
            <div>
              <div className="text-bold mb-8 text-lg">Company</div>
              <ul className="space-y-6 text-gray-400">
                <li>Who We Are</li>
                <li>Why Us</li>
              </ul>
            </div>
            <div>
              <div className="text-bold mb-8 text-lg">Follow Us</div>
              <ul className="space-y-6 text-gray-400">
                <li>Instagram</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-30 flex justify-between border-t border-t-gray-400 pt-10 text-sm text-gray-400">
          <div className="flex justify-between">
            <div className="flex items-center gap-8">
              <div>Privacy Policy</div> | <div>Terms & Conditions</div> |{' '}
              <div>Cookie Policy</div>
            </div>
          </div>
          <div className="">© 2025 FinTracker. All rights reserved.</div>
        </div>
      </footer>
    </>
  )
}
