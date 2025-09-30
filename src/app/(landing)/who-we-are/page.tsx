import { Card, CardContent } from '@/components/ui/card'
import Image from 'next/image'

export default function AboutPage() {
  const team = [
    {
      name: 'Alex Carter',
      role: 'Founder & CEO',
      image: '/landing/team1.jpg',
      bio: 'Passionate about simplifying personal finance and making money management accessible to everyone.',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Product',
      image: '/landing/team2.jpg',
      bio: 'Leads the vision for our product, focusing on intuitive design and user experience.',
    },
    {
      name: 'Michael Smith',
      role: 'Lead Developer',
      image: '/landing/team3.jpg',
      bio: 'Builds robust, scalable solutions that help FinTracker run smoothly and securely.',
    },
  ]

  return (
    <>
      <main className="container mx-auto py-20">
        {/* Hero Section */}
        <section className="text-center">
          <h1 className="text-6xl font-bold">
            Who <span className="text-blue-600">We Are</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            At <span className="font-semibold">FinTracker</span>, we believe
            finance shouldn’t be complicated. Our mission is to help people
            around the world gain control over their money, track their
            spending, and plan smarter for the future.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mt-20 grid items-center gap-14 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">Our Mission</h2>
            <p className="mt-6 text-gray-600">
              We want to empower individuals and businesses to take control of
              their financial future by providing intuitive tools, smart
              insights, and a seamless dashboard experience. Whether it’s
              budgeting, investments, or expense tracking — FinTracker is your
              financial companion.
            </p>
          </div>
          <div className="relative h-[400px] w-full">
            <Image
              src="/landing/mission.jpg"
              alt="Our Mission"
              fill
              className="rounded-3xl object-cover"
            />
          </div>
        </section>

        {/* Team Section */}
        <section className="mt-28 text-center">
          <h2 className="text-4xl font-bold">Meet Our Team</h2>
          <p className="mt-4 text-gray-600">
            We’re a group of passionate professionals working together to build
            a better way to manage finances.
          </p>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {team.map(member => (
              <Card
                key={member.name}
                className="overflow-hidden rounded-2xl shadow-md"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-blue-600">{member.role}</p>
                  <p className="mt-4 text-sm text-gray-600">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-28 text-center">
          <h2 className="text-4xl font-bold">Our Values</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            We believe in transparency, simplicity, and trust. These values
            shape the way we design our products and support our users.
          </p>
          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-2xl font-semibold text-blue-600">
                Transparency
              </h3>
              <p className="mt-2 text-gray-600">
                Clear communication and honest financial insights.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-blue-600">
                Simplicity
              </h3>
              <p className="mt-2 text-gray-600">
                A clean design and easy-to-use features for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-blue-600">Trust</h3>
              <p className="mt-2 text-gray-600">
                Secure data protection and reliable tools you can count on.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
