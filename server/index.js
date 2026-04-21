import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import mongoose from 'mongoose'

import userRouter from './src/routes/userRoutes.js'
import categoryRoutes from './src/routes/categoryRoutes.js'
import postRoutes from './src/routes/postRoutes.js'
import cartRoutes from './src/routes/cartRoutes.js'
import orderRoutes from './src/routes/orderRoutes.js'
import tripRoutes from './src/routes/tripRoutes.js'
import reviewRoutes from './src/routes/reviewRoutes.js'
import { errorMiddleware } from './src/middlewares/error.js'

export const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp'
}))

app.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'

  res.status(200).json({
    status: 'OK',
    database: dbStatus
  })
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/posts', postRoutes)
app.use('/api/v1/cart', cartRoutes)
app.use('/api/v1/orders', orderRoutes)
app.use('/api/v1/trips', tripRoutes)
app.use('/api/v1/reviews', reviewRoutes)

app.use(errorMiddleware)