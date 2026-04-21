import express from 'express'
import { adminOnly, verifyToken } from '../middlewares/auth.js'
import { createCategory, deleteCategory, getAllCategories, getCategory, updateCategory } from '../controllers/categoryController.js'

const router = express.Router()

router.route('/')
  .post(verifyToken, adminOnly, createCategory)
  .get(getAllCategories)

router.route('/:slug')
  .get(getCategory)
  .put(verifyToken, adminOnly, updateCategory)
  .delete(verifyToken, adminOnly, deleteCategory)

export default router