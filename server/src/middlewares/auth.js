import { ErrorHandler } from './error.js'
import jwt from 'jsonwebtoken'
import { User } from '../models/userModel.js'

const verifyToken = async (req, res, next) => {
  const token = req.cookies.token
  if (!token) return next(new ErrorHandler(401, 'Not authenticated'))
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) return next(new ErrorHandler(401, 'User not found'))
    req.user = user
    next()
  } catch (error) {
    return next(new ErrorHandler(401, 'Invalid token'))
  }
}

const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') return next(new ErrorHandler(403, 'Admin only'))
  next()
}

export { verifyToken, adminOnly }