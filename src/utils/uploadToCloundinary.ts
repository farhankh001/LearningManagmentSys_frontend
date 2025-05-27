import axios from "axios"
const CLOUDINARY_RAW_URL = 'https://api.cloudinary.com/v1_1/dh92igfwv/raw/upload'
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dh92igfwv/upload'



export const uploadToCloudinaryRaw = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', 'unsigned_lesson_uploads') // your preset

  const response = await axios.post(
    CLOUDINARY_RAW_URL,
    formData,
    {
      onUploadProgress: (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded * 100) / event.total)
          if (onProgress) onProgress(percent)
        }
      },
    }
  )

  return response.data.secure_url
}


export const uploadToCloudinary = async (
  file: File,
  onProgress?: (percent: number) => void
): Promise<string> => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset',"unsigned_lesson_uploads" )

  const response = await axios.post(
    CLOUDINARY_URL,
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (event) => {
        if (event.total) {
          const percent = Math.round((event.loaded * 100) / event.total)
          if (onProgress) onProgress(percent)
        }
      },
    }
  )

  return response.data.secure_url
}

