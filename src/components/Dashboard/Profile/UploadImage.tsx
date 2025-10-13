'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadProfileImage } from '@/lib/actions/uploadProfileImage'
import { Loader, Pencil } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const UploadImage = () => {
  const [loading, setLoading] = useState(false)
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    if (file && !file.type.startsWith('image/')) {
      toast.error('Only images allowed!')
      return
    }
    setLoading(true)

    const res = await uploadProfileImage(file)

    if (res.error) {
      toast.error(res.error)
    }

    toast.success('Image successfully changed!')
    setLoading(false)
  }

  return (
    <>
      <Label
        className="bg-primary absolute right-0 bottom-0 cursor-pointer rounded-full p-2"
        htmlFor="picture"
      >
        {loading ? (
          <Loader className="animate-spin" />
        ) : (
          <Pencil className="text-white" />
        )}
      </Label>
      <Input
        disabled={loading}
        id="picture"
        onChange={handleChangeImage}
        type="file"
        accept="image/*"
        className="hidden"
      />
    </>
  )
}

export default UploadImage
