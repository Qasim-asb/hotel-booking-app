import express from 'express'
import { adminOnly, verifyToken } from '../middlewares/auth.js'
import { createPost, deletePost, filterPosts, getAllPosts, getPaginatedPosts, getPost, relatedPosts, updatePost } from '../controllers/postController.js'

const router = express.Router()

router.route('/')
  .post(verifyToken, adminOnly, createPost)
  .get(getAllPosts)

router.get('/paginated', getPaginatedPosts)

router.get('/filter', filterPosts)
router.get('/related/:postId/:categoryId', relatedPosts)

router.route('/:slug')
  .get(getPost)
  .put(verifyToken, adminOnly, updatePost)
  .delete(verifyToken, adminOnly, deletePost)

export default router