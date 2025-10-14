import ChangePasswordForm from '@/components/Dashboard/Profile/ChangePasswordForm'
import EditProfileForm from '@/components/Dashboard/Profile/EditProfileForm'
import UploadImage from '@/components/Dashboard/Profile/UploadImage'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { prisma } from '@/lib/prisma'
import { checkUser } from '@/lib/userCheck'
import { LockKeyhole } from 'lucide-react'

import Image from 'next/image'

const Profile = async () => {
  const { email } = await checkUser()

  const user = await prisma.user.findUnique({
    where: { email },
    include: { profile: true },
  })

  if (!user) throw new Error('User not found!')

  let protectedDemoEmail = false
  if (user.email === process.env.DEMO_USER_EMAIL) {
    protectedDemoEmail = true
  } // demo user protection

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
                  fill
                  className="rounded-full object-cover"
                  alt="avatar"
                />
                <UploadImage />
              </div>
              <div>
                <EditProfileForm user={user} protection={protectedDemoEmail} />
              </div>
            </div>
          </TabsContent>
          <TabsContent
            value="password"
            className="grid grid-cols-2 gap-14 pt-12"
          >
            <ChangePasswordForm />
            <div className="flex items-center justify-center rounded-4xl bg-[var(--secondary)]">
              <LockKeyhole className="h-full w-full max-w-[200px] animate-pulse text-[var(--primary)]" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Profile
