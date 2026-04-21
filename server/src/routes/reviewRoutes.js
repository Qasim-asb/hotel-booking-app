import express from 'express'
import { adminOnly, verifyToken } from '../middlewares/auth.js'
import { approveReview, createReview, deleteReview, getPendingReviews, getPostReviews } from '../controllers/reviewController.js'

const router = express.Router()

router.post('/', verifyToken, createReview)
router.get('/post/:postId', getPostReviews)
router.get('/pending', verifyToken, adminOnly, getPendingReviews)
router.put('/:id/approve', verifyToken, adminOnly, approveReview)
router.delete('/:id', verifyToken, adminOnly, deleteReview)

export default router