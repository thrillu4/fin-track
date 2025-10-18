import { ROUTES } from '@/lib/routes'
import Link from 'next/link'
import DemoUserButton from './DemoUserButton'
import Logo from './Logo'

const NavBar = () => {
  return (
    <nav className="container mx-auto flex w-full items-center justify-between p-4">
      <Logo />
      <div className="hidden gap-10 font-semibold md:flex">
        <Link href={ROUTES.WHO_WE_ARE}>About Us</Link>
        <Link href={ROUTES.HOW_IT_WORKS}>How it Works</Link>
        <Link href={`${ROUTES.HOME}#pricing`}>Pricing</Link>
      </div>
      <DemoUserButton classname="cursor-pointer rounded-full bg-indigo-600 dark:text-white  hover:bg-indigo-600/80 ">
        Live Demo
      </DemoUserButton>
    </nav>
  )
}

export default NavBar
