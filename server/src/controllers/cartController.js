import { ErrorHandler } from '../middlewares/error.js'
import { Post } from '../models/postModel.js'
import { Cart } from '../models/cartModel.js'

const addToCart = async (req, res, next) => {
  try {
    const { postId, nights, checkInDate } = req.body || {}
    if (!postId || !nights || !checkInDate) return next(new ErrorHandler(400, 'Missing fields'))
    const post = await Post.findById(postId)
    if (!post) return next(new ErrorHandler(404, 'Hotel not found'))
    if (!post.isAvailable) return next(new ErrorHandler(400, 'This hotel is not available for booking'))

    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) cart = new Cart({ user: req.user._id, items: [] })

    const existingIndex = cart.items.findIndex(item => item.post.toString() === postId)
    if (existingIndex !== -1) {
      cart.items[existingIndex].nights = nights
      cart.items[existingIndex].checkInDate = checkInDate
    } else {
      cart.items.push({ post: postId, nights, checkInDate })
    }
    await cart.save()
    res.status(200).json({
      message: 'Added to cart',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.post')
    if (!cart) cart = { items: [] }
    res.status(200).json({
      success: true,
      cart: cart.items
    })
  } catch (error) {
    next(error)
  }
}

const removeFromCart = async (req, res, next) => {
  try {
    const { postId } = req.params
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) return next(new ErrorHandler(404, 'Cart not found'))
    cart.items = cart.items.filter(item => item.post.toString() !== postId)
    await cart.save()
    res.status(200).json({
      message: 'Removed from cart',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndDelete({ user: req.user._id })
    res.status(200).json({
      message: 'Cart cleared',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

export { addToCart, getCart, removeFromCart, clearCart }