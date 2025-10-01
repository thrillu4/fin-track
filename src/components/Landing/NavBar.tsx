import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import DemoUserButton from './DemoUserButton'

const NavBar = () => {
  return (
    <nav className="container mx-auto flex w-full items-center justify-between p-4">
      <Link href={ROUTES.HOME} className="relative h-10 w-full max-w-[139px]">
        <Image
          src={'/landing/logo.png'}
          fill
          alt="logo"
          className="object-contain"
        />
      </Link>
      <div className="hidden gap-10 font-semibold md:flex">
        <Link href={ROUTES.WHO_WE_ARE}>About Us</Link>
        <Link href={ROUTES.HOW_IT_WORKS}>How it Works</Link>
        <Link href={`${ROUTES.HOME}#pricing`}>Pricing</Link>
      </div>
      <DemoUserButton classname="cursor-pointer rounded-full ">
        Live Demo
      </DemoUserButton>
    </nav>
  )
}

export default NavBar
