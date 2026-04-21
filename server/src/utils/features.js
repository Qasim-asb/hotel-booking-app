import jwt from 'jsonwebtoken'
import v2 from '../config/cloudinary.js'

const response = (user, res, statusCode, message) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

  const isProduction = process.env.NODE_ENV === 'production'

  res.status(statusCode).cookie('token', token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/'
  }).json({
    message,
    success: true,
    user
  })
}

const uploadCloudinaryImages = async (files) => {
  return await Promise.all(
    files.map(async (file) => {
      const result = await v2.uploader.upload(file.tempFilePath, { folder: 'hotel_posts' })
      return {
        public_id: result.public_id,
        url: result.secure_url
      }
    })
  )
}

const deleteCloudinaryImages = async (images) => {
  await Promise.all(images.map(img => v2.uploader.destroy(img.public_id)))
}

export { response, uploadCloudinaryImages, deleteCloudinaryImages }