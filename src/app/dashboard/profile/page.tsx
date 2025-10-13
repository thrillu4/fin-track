import { auth } from '@/auth'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { prisma } from '@/lib/prisma'
import Image from 'next/image'

const Profile = async () => {
  const session = await auth()

  if (!session?.user?.email) return

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
  })

  return (
    <div className="px-10 py-8">
      <div className="rounded-3xl bg-[var(--sidebar)] p-8">
        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile">Edit Profile</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="pt-12">
            <div className="grid grid-cols-5">
              <div className="">{/* <Image src={}/> */}</div>
              <div className="col-start-2 col-end-4">2</div>
              <div className="col-start-4 col-end-6">3</div>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
