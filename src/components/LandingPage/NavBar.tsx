import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

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
        <a href="#product">Why Us</a>
        <a href="#how">How it Works</a>
        <a href="#pricing">Pricing</a>
      </div>
      <Button>Live Demo</Button>
    </nav>
  )
}

export default NavBar
