import express from 'express'
import { verifyToken } from '../middlewares/auth.js'
import { addToCart, clearCart, getCart, removeFromCart } from '../controllers/cartController.js'

const router = express.Router()

router.use(verifyToken)

router.route('/').post(addToCart).get(getCart).delete(clearCart)
router.delete('/:postId', removeFromCart)

export default router