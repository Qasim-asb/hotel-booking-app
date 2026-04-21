import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { createOrder, getUserOrders } from '../controllers/orderController.js'

const router = express.Router()

router.use(verifyToken)
router.post('/', createOrder)
router.get('/', getUserOrders)

export default router