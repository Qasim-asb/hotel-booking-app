import express from 'express'
import { adminOnly, verifyToken } from '../middlewares/auth.js'
import { createTrip, deleteTrip, getAllTrips, updateTrip } from '../controllers/tripController.js'

const router = express.Router()

router.post('/', verifyToken, adminOnly, createTrip)
router.get('/', getAllTrips)
router.put('/:id', verifyToken, adminOnly, updateTrip)
router.delete('/:id', verifyToken, adminOnly, deleteTrip)

export default router