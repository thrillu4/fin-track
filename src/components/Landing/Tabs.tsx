import { ROUTES } from '@/lib/routes'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'
import DemoUserButton from './DemoUserButton'

const Tabs = () => {
  return (
    <div className="p-2">
      <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-teal-50 p-6 lg:px-26 lg:py-18 dark:text-black">
        <div className="max-w-sm space-y-6">
          <div className="hidden items-center justify-center rounded-2xl bg-teal-100 p-4 lg:inline-flex">
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
            Spending only what you have is not a sustainable way to get by. Put
            money aside for emergencies, building up your savings account and
            taking advantage of opportunities for rewards are all steps that
          </p>
          <div className="flex items-center gap-2">
            <Link href={ROUTES.SIGN_UP}>
              <Button
                variant={'link'}
                className="flex cursor-pointer px-7 py-5 text-lg font-bold text-teal-600"
              >
                Get Started <ArrowRight />
              </Button>
            </Link>

            <DemoUserButton classname="cursor-pointer text-lg bg-transparent text-black hover:bg-transparent transition duration-200 hover:text-indigo-500 underline">
              Try Demo
            </DemoUserButton>
          </div>
        </div>
        <div className="relative h-120 w-full max-w-lg">
          <Image
            src={'/landing/transac.png'}
            alt="finance organizer"
            fill
            className="rounded-3xl object-contain"
          />
        </div>
      </section>

      <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-[#EDEEFC] px-6 pt-6 lg:px-26 lg:pt-18 dark:text-black">
        <div className="relative hidden h-120 w-[350px] lg:block">
          <Image
            src={'/landing/iphone.png'}
            alt="iphone app"
            fill
            className="object-contain"
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
            Have a dedicated watchlist for your desired stocks, we will help you
            make informed decisions and help you gain high profits. We will
            provide alerts and trackers for specific price ranges you are
            looking for
          </p>
          <div className="flex items-center gap-2">
            <Link href={ROUTES.SIGN_UP}>
              <Button
                variant={'link'}
                className="flex cursor-pointer px-7 py-5 text-lg font-bold text-[#7175B8]"
              >
                Get Started <ArrowRight />
              </Button>
            </Link>

            <DemoUserButton classname="text-lg bg-transparent text-black hover:bg-transparent  transition duration-200 hover:text-indigo-500 cursor-pointer underline">
              Try Demo
            </DemoUserButton>
          </div>
        </div>
      </section>

      <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-orange-50 dark:text-black">
        <div className="max-w-lg space-y-6 p-8 font-bold lg:py-18">
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
          <div className="flex items-center gap-2">
            <Link href={ROUTES.SIGN_UP}>
              <Button
                variant={'link'}
                className="flex cursor-pointer px-7 py-5 text-lg font-bold text-orange-500"
              >
                Get Started <ArrowRight />
              </Button>
            </Link>

            <DemoUserButton classname=" text-lg bg-transparent text-black hover:bg-transparent  transition duration-200 hover:text-indigo-500 cursor-pointer underline">
              Try Demo
            </DemoUserButton>
          </div>
        </div>
        <div className="relative hidden h-[630px] w-[600px] lg:block">
          <Image
            src={'/landing/group.png'}
            alt="charts"
            fill
            className="object-contain"
          />
        </div>
      </section>

      <section className="mt-14 flex items-center justify-evenly gap-15 rounded-[56px] bg-fuchsia-100 p-6 lg:px-26 lg:py-18 dark:text-black">
        <div className="relative hidden h-140 w-full max-w-xl lg:block">
          <Image
            src={'/landing/inv.png'}
            alt="invoice organizer"
            fill
            className="object-contain"
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
            processes are saved in its web interface. Plus, it has a contact us
            feature for customers and businesses.
          </p>

          <div className="flex items-center gap-2">
            <Link href={ROUTES.SIGN_UP}>
              <Button
                variant={'link'}
                className="flex cursor-pointer px-7 py-5 text-lg font-bold text-fuchsia-500"
              >
                Get Started <ArrowRight />
              </Button>
            </Link>

            <DemoUserButton classname=" text-lg bg-transparent text-black hover:bg-transparent transition duration-200 hover:text-indigo-500 cursor-pointer underline">
              Try Demo
            </DemoUserButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Tabs
