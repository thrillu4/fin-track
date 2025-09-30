import Footer from '@/components/Landing/Footer'
import NavBar from '@/components/Landing/NavBar'

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  )
}

export default layout
