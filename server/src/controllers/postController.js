import { ErrorHandler } from '../middlewares/error.js'
import { Post } from '../models/postModel.js'
import { deleteCloudinaryImages, uploadCloudinaryImages } from '../utils/features.js'
import mongoose from 'mongoose'

const createPost = async (req, res, next) => {
  try {
    let { title, hotelLocation, description, facilities, price, nearArea, category, guest, isAvailable } = req.body || {}

    facilities = JSON.parse(facilities)
    nearArea = JSON.parse(nearArea)
    isAvailable = JSON.parse(isAvailable)

    if (!title || !hotelLocation || !description || !facilities.length || !price || !nearArea.length || !category || !guest || typeof isAvailable === 'undefined') {
      return next(new ErrorHandler(400, 'All fields required'))
    }

    const parsedPrice = Number(price)
    const parsedGuest = Number(guest)

    const files = req.files?.images ? Array.isArray(req.files.images) ? req.files.images : [req.files.images] : []

    if (files.length !== 3) return next(new ErrorHandler(400, 'Exactly 3 images required'))

    const images = await uploadCloudinaryImages(files)

    const newPost = await Post.create({
      title,
      hotelLocation,
      description,
      facilities,
      price: parsedPrice,
      nearArea,
      category,
      images,
      guest: parsedGuest,
      isAvailable
    })

    res.status(201).json({
      message: 'Post created',
      success: true,
      post: newPost
    })
  } catch (error) {
    next(error)
  }
}

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({}).populate('category')
    res.status(200).json({
      success: true,
      posts
    })
  } catch (error) {
    next(error)
  }
}

const getPaginatedPosts = async (req, res, next) => {
  try {
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 6

    const skip = (page - 1) * limit

    const posts = await Post.find({}).populate('category').sort({ createdAt: -1 }).skip(skip).limit(limit)
    const totalPosts = await Post.countDocuments()
    const totalPages = Math.ceil(totalPosts / limit)

    return res.status(200).json({
      success: true,
      posts,
      totalPages
    })
  } catch (error) {
    next(error)
  }
}

const getPost = async (req, res, next) => {
  try {
    const { slug } = req.params
    const post = await Post.findOne({ slug }).populate('category')
    if (!post) return next(new ErrorHandler(404, 'Post not found'))
    res.status(200).json({
      success: true,
      post
    })
  } catch (error) {
    next(error)
  }
}

const updatePost = async (req, res, next) => {
  try {
    const { slug } = req.params
    const post = await Post.findOne({ slug })
    if (!post) return next(new ErrorHandler(404, 'Post not found'))

    let { title, hotelLocation, description, facilities, price, nearArea, category, guest, isAvailable, existingImages } = req.body || {}

    const files = req.files?.images ? Array.isArray(req.files.images) ? req.files.images : [req.files.images] : []

    if (facilities) facilities = JSON.parse(facilities)
    if (nearArea) nearArea = JSON.parse(nearArea)
    if (typeof isAvailable !== 'undefined') isAvailable = JSON.parse(isAvailable)
    existingImages = existingImages ? JSON.parse(existingImages) : []

    if (!title && !hotelLocation && !description && !facilities.length && !price && !nearArea.length && !category && !guest && typeof isAvailable === 'undefined' && files.length === 0 && existingImages.length === 0) {
      return next(new ErrorHandler(400, 'No fields to update'))
    }

    const keptImages = post.images.filter(img => existingImages.includes(img.url))

    let newImages = []
    if (files.length > 0) {
      newImages = await uploadCloudinaryImages(files)
    }

    const finalImages = [...keptImages, ...newImages]

    if (finalImages.length !== 3) {
      return next(new ErrorHandler(400, 'Exactly 3 images required'))
    }

    const imagesToDelete = post.images.filter(img => !existingImages.includes(img.url))

    if (imagesToDelete.length > 0) {
      await deleteCloudinaryImages(imagesToDelete)
    }

    if (title) post.title = title
    if (hotelLocation) post.hotelLocation = hotelLocation
    if (description) post.description = description
    if (facilities) post.facilities = facilities
    if (price) post.price = Number(price)
    if (nearArea) post.nearArea = nearArea
    if (category) post.category = category
    if (guest) post.guest = Number(guest)
    if (typeof isAvailable !== 'undefined') post.isAvailable = isAvailable
    post.images = finalImages

    await post.save()

    res.status(200).json({
      message: 'Post updated',
      success: true,
      post
    })
  } catch (error) {
    next(error)
  }
}

const deletePost = async (req, res, next) => {
  try {
    const { slug } = req.params
    const post = await Post.findOne({ slug })
    if (!post) return next(new ErrorHandler(404, 'Post not found'))
    await deleteCloudinaryImages(post.images)
    await post.deleteOne()
    res.status(200).json({
      message: 'Post deleted',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

const relatedPosts = async (req, res, next) => {
  try {
    const { postId, categoryId } = req.params

    const posts = await Post.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(categoryId),
          _id: { $ne: new mongoose.Types.ObjectId(postId) }
        }
      },
      { $sample: { size: 2 } }
    ])
    const populated = await Post.populate(posts, { path: 'category' })
    res.status(200).json({
      success: true,
      posts: populated
    })
  } catch (error) {
    next(error)
  }
}

const filterPosts = async (req, res, next) => {
  try {
    const { keyword, minPrice, maxPrice, amenities, page = 1, limit = 6 } = req.query

    let query = {}

    if (keyword) {
      const words = keyword.split(' ')
      const regexString = words.join('|')
      query.$or = [
        { title: { $regex: regexString, $options: 'i' } },
        { description: { $regex: regexString, $options: 'i' } }
      ]
    }

    if (minPrice || maxPrice) {
      query.price = {}
      if (minPrice) query.price.$gte = Number(minPrice)
      if (maxPrice) query.price.$lte = Number(maxPrice)
    }

    if (amenities) {
      const amenityList = amenities.split(',')
      query.facilities = { $in: amenityList }
    }

    const skip = (page - 1) * limit

    const posts = await Post.find(query).skip(skip).limit(Number(limit)).populate('category')

    const total = await Post.countDocuments(query)

    res.status(200).json({
      success: true,
      posts,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit)
    })
  } catch (error) {
    next(error)
  }
}

export { createPost, getAllPosts, getPaginatedPosts, getPost, updatePost, deletePost, relatedPosts, filterPosts }