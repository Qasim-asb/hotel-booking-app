import { Cart } from '../models/cartModel.js'
import { ErrorHandler } from '../middlewares/error.js'
import { Order } from '../models/orderModel.js'

const createOrder = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.post')
    if (!cart || cart.items.length === 0) return next(new ErrorHandler(400, 'Cart is empty'))

    for (const item of cart.items) {
      if (!item.post.isAvailable) {
        return next(new ErrorHandler(400, `Hotel "${item.post.title}" is no longer available`))
      }
    }

    let subtotal = 0
    const orderItems = cart.items.map(item => {
      const price = item.post.price
      const total = price * item.nights
      subtotal += total
      return {
        post: item.post._id,
        title: item.post.title,
        price,
        nights: item.nights,
        checkInDate: item.checkInDate
      }
    })
    const tax = Math.round(subtotal * 0.1)
    const total = subtotal + tax

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      subtotal,
      tax,
      total,
      status: 'paid'
    })
    await Cart.findOneAndDelete({ user: req.user._id })
    res.status(201).json({
      message: 'Order created',
      success: true,
      order
    })
  } catch (error) {
    next(error)
  }
}

const getUserOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt')
    res.status(200).json({ success: true, orders })
  } catch (error) { next(error) }
}

export { createOrder, getUserOrders }