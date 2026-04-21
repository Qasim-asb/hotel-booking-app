import { ErrorHandler } from '../middlewares/error.js'
import { Category } from '../models/categoryModel.js'

const createCategory = async (req, res, next) => {
  try {
    const { category } = req.body || {}
    if (!category) return next(new ErrorHandler(400, 'Category name required'))

    const isAlreadyExist = await Category.findOne({ category })
    if (isAlreadyExist) return next(new ErrorHandler(409, 'Category already exists'))

    const newCategory = await Category.create({ category })
    res.status(201).json({
      message: 'Category created',
      success: true,
      category: newCategory
    })
  } catch (error) {
    next(error)
  }
}

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({})
    res.status(200).json({
      success: true,
      categories
    })
  } catch (error) {
    next(error)
  }
}

const getCategory = async (req, res, next) => {
  try {
    const { slug } = req.params
    const category = await Category.findOne({ slug })
    if (!category) return next(new ErrorHandler(404, 'Category not found'))
    res.status(200).json({
      success: true,
      category
    })
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const { category } = req.body || {}
    const { slug } = req.params

    if (!category) return next(new ErrorHandler(400, 'Category name required'))

    const existingCategory = await Category.findOne({ slug })
    if (!existingCategory) return next(new ErrorHandler(404, 'Category not found'))

    existingCategory.category = category
    await existingCategory.save()
    res.status(200).json({
      message: 'Category updated',
      success: true
    })
  } catch (error) {
    if (error.code === 11000) return next(new ErrorHandler(409, 'Category already exists'))
    next(error)
  }
}

const deleteCategory = async (req, res, next) => {
  try {
    const { slug } = req.params
    const category = await Category.findOneAndDelete({ slug })
    if (!category) return next(new ErrorHandler(404, 'Category not found'))
    res.status(200).json({
      message: 'Category deleted',
      success: true
    })
  } catch (error) {
    next(error)
  }
}

export { createCategory, getAllCategories, getCategory, updateCategory, deleteCategory }