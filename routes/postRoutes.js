import express from 'express'
const router = express.Router()
import {
  getPosts,
  createPost
} from '../controllers/postController.js'
import { protect } from '../middlewares/authMiddleware.js'

router.route('/').get(getPosts).post(protect,createPost)

export default router