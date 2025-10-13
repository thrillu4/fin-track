'use server'

import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'
import cloudinary from '../cloudinary'
import { updateAvatar } from './updateAvatar'

export const uploadProfileImage = async (file: File) => {
  if (!file) return { error: 'Image file not found!' }
  try {
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              folder: 'tracker-avatars',
              transformation: [
                { width: 200, height: 200, crop: 'fill', gravity: 'face' },
                { quality: 'auto' },
              ],
            },
            (
              error: UploadApiErrorResponse | undefined,
              result: UploadApiResponse | undefined,
            ) => {
              if (error || !result) {
                reject(error)
              } else resolve(result)
            },
          )
          .end(buffer)
      },
    )

    const imageUrl = uploadResult.secure_url

    if (!imageUrl) return { error: 'Upload failed, please try again later!' }

    await updateAvatar(imageUrl)

    return { url: imageUrl }
  } catch (error) {
    console.log(error)
    return { error: 'Upload failed, please try again later!' }
  }
}
