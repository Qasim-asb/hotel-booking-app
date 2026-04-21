import { User } from '../models/userModel.js'
import { ErrorHandler } from '../middlewares/error.js'
import bcrypt from 'bcrypt'
import { response } from '../utils/features.js'

const register = async (req, res, next) => {
  try {
    const { name, email, password, secretKey } = req.body || {}
    if (!name || !email || !password) return next(new ErrorHandler(400, 'All fields required'))
    if (password.length < 5) return next(new ErrorHandler(400, 'Password too short'))

    const isAlreadyExist = await User.findOne({ email })
    if (isAlreadyExist) return next(new ErrorHandler(409, 'Email already exists'))

    let role = 'user'
    if (secretKey && secretKey === process.env.ADMIN_SECRET) role = 'admin'

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    })

    const { password: _, ...userData } = user.toObject()
    response(userData, res, 201, 'Registered successfully')
  } catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return next(new ErrorHandler(400, 'All fields required'))

    const user = await User.findOne({ email }).select('+password')
    if (!user) return next(new ErrorHandler(401, 'Invalid credentials'))

    const match = await bcrypt.compare(password, user.password)
    if (!match) return next(new ErrorHandler(401, 'Invalid credentials'))

    const { password: _, ...userData } = user.toObject()
    response(userData, res, 200, 'Login successful')
  } catch (error) {
    next(error)
  }
}

const logout = (req, res) => {
  const isProduction = process.env.NODE_ENV === 'production'

  res.status(200).clearCookie('token', {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    path: '/'
  }).json({
    message: 'Logged out',
    success: true
  })
}

const checkAuth = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  })
}

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json({
      success: true,
      users
    })
  } catch (error) {
    next(error)
  }
}

const updateUserRole = async (req, res, next) => {
  try {
    const { id } = req.params
    const { role } = req.body || {}
    if (!['user', 'admin'].includes(role)) return next(new ErrorHandler(400, 'Invalid role'))
    const user = await User.findById(id)
    if (!user) return next(new ErrorHandler(404, 'User not found'))
    user.role = role
    await user.save()
    res.status(200).json({
      message: 'Role updated',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

export { register, login, logout, checkAuth, getAllUsers, updateUserRole }