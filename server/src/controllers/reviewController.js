import { ErrorHandler } from '../middlewares/error.js'
import { Post } from '../models/postModel.js'
import { Review } from '../models/reviewModel.js'

const createReview = async (req, res, next) => {
  try {
    const { postId, rating, content } = req.body || {}
    if (!postId || !rating || !content) return next(new ErrorHandler(400, 'All fields required'))
    const post = await Post.findById(postId)
    if (!post) return next(new ErrorHandler(404, 'Hotel not found'))
    const review = await Review.create({ user: req.user._id, post: postId, rating, content })
    res.status(201).json({
      message: 'Review created',
      success: true,
      review
    })
  } catch (error) {
    next(error)
  }
}

const getPostReviews = async (req, res, next) => {
  try {
    const { postId } = req.params
    const reviews = await Review.find({ post: postId, status: 'approved' }).populate('user', 'name')
    res.status(200).json({
      success: true,
      reviews
    })
  } catch (error) {
    next(error)
  }
}

const getPendingReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: 'pending' }).populate('user', 'name email').populate('post', 'title slug')

    res.status(200).json({
      success: true,
      reviews
    })
  } catch (error) {
    next(error)
  }
}

const approveReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const review = await Review.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    )
    if (!review) return next(new ErrorHandler(404, 'Review not found'))

    res.status(200).json({
      success: true,
      review
    })
  } catch (error) {
    next(error)
  }
}

const deleteReview = async (req, res, next) => {
  try {
    const { id } = req.params
    const review = await Review.findByIdAndDelete(id)
    if (!review) return next(new ErrorHandler(404, 'Review not found'))

    res.status(200).json({
      message: 'Review deleted',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

export { createReview, getPostReviews, getPendingReviews, approveReview, deleteReview }