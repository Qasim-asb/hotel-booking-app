import { ErrorHandler } from '../middlewares/error.js'
import { uploadCloudinaryImages, deleteCloudinaryImages } from '../utils/features.js'
import { Trip } from '../models/tripModel.js'

const createTrip = async (req, res, next) => {
  try {
    const { name, location, price, duration, description } = req.body
    if (!name || !location || !price || !duration) return next(new ErrorHandler(400, 'Missing fields'))
    const parsedPrice = Number(price)
    let image = null
    if (req.files && req.files.image) {
      const uploaded = await uploadCloudinaryImages([req.files.image])
      image = uploaded[0]
    }
    const trip = await Trip.create({ name, location, image, price: parsedPrice, duration, description })
    res.status(201).json({
      message: 'Trip created',
      success: true,
      trip
    })
  } catch (error) {
    next(error)
  }
}

const getAllTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find()
    res.status(200).json({
      success: true,
      trips
    })
  } catch (error) {
    next(error)
  }
}

const updateTrip = async (req, res, next) => {
  try {
    const { id } = req.params
    let trip = await Trip.findById(id)
    if (!trip) return next(new ErrorHandler(404, 'Trip not found'))
    const { name, location, price, duration, description, removeImage } = req.body || {}

    if (name !== undefined) trip.name = name
    if (location !== undefined) trip.location = location
    if (price !== undefined) trip.price = Number(price)
    if (duration !== undefined) trip.duration = duration
    if (description !== undefined) trip.description = description

    if (removeImage === 'true' && trip.image?.public_id) {
      await deleteCloudinaryImages([trip.image])
      trip.image = null
    }

    if (req.files?.image) {
      if (trip.image?.public_id) await deleteCloudinaryImages([trip.image])
      const uploaded = await uploadCloudinaryImages([req.files.image])
      trip.image = uploaded[0]
    }

    await trip.save()
    res.status(200).json({
      message: 'Trip updated',
      success: true,
      trip
    })
  } catch (error) {
    next(error)
  }
}

const deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params
    const trip = await Trip.findById(id)
    if (!trip) return next(new ErrorHandler(404, 'Trip not found'))
    if (trip.image?.public_id) await deleteCloudinaryImages([trip.image])
    await trip.deleteOne()
    res.status(200).json({
      message: 'Trip deleted',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

export { createTrip, getAllTrips, updateTrip, deleteTrip }