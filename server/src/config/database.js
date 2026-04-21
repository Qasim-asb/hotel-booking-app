import mongoose from 'mongoose'

export const connectDB = async () => {
  mongoose.connection.on('connected', () => console.log('Database connected'))

  mongoose.connection.on('error', (error) => console.error('Database error:', error.message))

  mongoose.connection.on('disconnected', () => console.log('Database disconnected'))

  await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'hotel-booking-app',
    serverSelectionTimeoutMS: 5000
  })
}

export const disconnectDB = async () => {
  await mongoose.connection.close()
  console.log('Database connection closed')
}
