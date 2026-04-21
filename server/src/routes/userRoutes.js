import express from 'express'
import { checkAuth, getAllUsers, login, logout, register, updateUserRole } from '../controllers/userController.js'
import { adminOnly, verifyToken } from '../middlewares/auth.js'

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', verifyToken, checkAuth)
router.get('/all', verifyToken, adminOnly, getAllUsers)
router.put('/:id/role', verifyToken, adminOnly, updateUserRole)

export default router