import { app } from './index.js'
import { connectDB, disconnectDB } from './src/config/database.js'

const PORT = process.env.PORT || 3000

let server

const startServer = async () => {
  try {
    await connectDB()

    server = app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  } catch (error) {
    console.error('Server failed to start:', error.message)
    process.exit(1)
  }
}

startServer()

const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`)

  if (server) {
    server.close(() => {
      console.log('HTTP server closed')
    })
  }

  await disconnectDB()

  console.log('Process terminated cleanly')
  process.exit(0)
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'))
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))

process.on('uncaughtException', async (err) => {
  console.error('Uncaught Exception:', err)
  await gracefulShutdown('uncaughtException')
})

process.on('unhandledRejection', async (err) => {
  console.error('Unhandled Rejection:', err)
  await gracefulShutdown('unhandledRejection')
})
