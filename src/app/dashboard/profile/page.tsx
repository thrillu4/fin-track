import { auth } from '@/auth'
import EditProfileForm from '@/components/Dashboard/Profile/EditProfileForm'
import UploadImage from '@/components/Dashboard/Profile/UploadImage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { prisma } from '@/lib/prisma'

import Image from 'next/image'

const Profile = async () => {
  const session = await auth()

  if (!session?.user?.email) return

  const email = session.user.email

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  })

  if (!user) return

  return (
    <div className="px-10 py-8">
      <div className="rounded-3xl bg-[var(--sidebar)] p-8">
        <Tabs defaultValue="profile">
          <TabsList className="w-full">
            <TabsTrigger value="profile">Edit Profile</TabsTrigger>
            <TabsTrigger value="password">Change Password</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="pt-12">
            <div className="grid grid-cols-[150px_1fr] gap-x-14">
              <div className="relative h-[150px] w-[150px]">
                <Image
                  src={user.image || '/dash/demo-logo.png'}
                  width={150}
                  height={150}
                  className="rounded-full"
                  alt="avatar"
                />
                <UploadImage />
              </div>
              <div>
                <EditProfileForm user={user} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
