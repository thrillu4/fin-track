'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { updateAvatar } from '@/lib/actions/updateAvatar'
import { Loader, Pencil } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

const UploadImage = () => {
  const [loading, setLoading] = useState(false)
  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const MAX_FILE_SIZE = 10 * 1024 * 1024

    if (!file) return

    if (file.size > MAX_FILE_SIZE) {
      toast.error('File too large! 10mb Maximum.')
      return
    }

    if (file && !file.type.startsWith('image/')) {
      toast.error('Only images allowed!')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        'upload_preset',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`,
      )
      formData.append(
        'cloud_name',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
      )

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      )

      if (!response.ok) {
        toast.error('Upload failed, please try again later!')
        return
      }

      const uploadResult = await response.json()

      const imageUrl = uploadResult.secure_url

      if (!imageUrl) {
        toast.error('Upload failed, please try again later!')
        return
      }

      const res = await updateAvatar(imageUrl)

      if (res?.error) {
        toast.error(res.error)
      }

      toast.success('Image successfully changed!')
    } catch (error) {
      console.log(error)
      toast.error('Upload failed, please try again later!')
    } finally {
      setLoading(false)
    }
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
