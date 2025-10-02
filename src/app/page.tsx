import DemoUserButton from '@/components/Landing/DemoUserButton'
import Footer from '@/components/Landing/Footer'
import NavBar from '@/components/Landing/NavBar'
import Pricing from '@/components/Landing/Pricing'
import Tabs from '@/components/Landing/Tabs'
import Testimonials from '@/components/Landing/Testimonials'
import { Button } from '@/components/ui/button'

import { ROUTES } from '@/lib/routes'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
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
          <div className="mt-8 flex items-center justify-center gap-5">
            <Link href={ROUTES.SIGN_UP}>
              <Button className="flex rounded-full bg-[#0601F6] px-9 py-7 text-lg hover:bg-[#0601F6]/80 dark:text-white">
                Get Started
              </Button>
            </Link>
            <DemoUserButton classname="  bg-gray-200 px-9 py-7 rounded-full text-lg  text-gray-800 shadow transition  hover:bg-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
              Try Demo
            </DemoUserButton>
          </div>
        </div>

        <Tabs />

        <Testimonials />

        <Pricing />

        <section className="relative mt-14 rounded-4xl bg-gray-100 py-18 dark:text-black">
          <h2 className="mx-auto max-w-[530px] text-center text-5xl font-bold">
            Let’s get you started with{' '}
            <span className="text-blue-600">FinTrack</span>!
          </h2>
          <p className="mx-auto mt-6 max-w-[530px] text-center text-gray-600">
            It only takes a few clicks and you can get started with managing
            your finances like a Professional.
          </p>
          <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 md:flex-row">
            <DemoUserButton classname='bg-[#0601F6] hover:bg-[#0601F6]/80 dark:text-white font-bold" mx-auto mt-10 flex rounded-full px-14 py-8 text-lg'>
              Continue as Demo User
            </DemoUserButton>
          </div>

          <svg
            className="absolute bottom-10 left-0 z-20"
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
                clipPath="url(#paint0_angular_60_5285_clip_path)"
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
      <Footer />
    </>
  )
}
