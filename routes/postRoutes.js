import express from 'express'
const router = express.Router()
import {
  getPosts,
  createPost,
  getUserPosts
} from '../controllers/postController.js'
import { addRequest } from './../controllers/requestController.js';

import { protect } from '../middlewares/authMiddleware.js'

router.route('/').get(getPosts).post(protect,createPost)

router.route('/:id').get(protect,getUserPosts)

router.route('/request/:id').post(protect, addRequest)

export default router