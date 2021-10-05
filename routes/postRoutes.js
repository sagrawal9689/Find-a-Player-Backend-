import express from 'express'
const router = express.Router()
import {
  getPosts,
  createPost,
  getUserPosts
} from '../controllers/postController.js'
import { addRequest, getRequest } from './../controllers/requestController.js';

import { protect } from '../middlewares/authMiddleware.js'

router.route('/').get(getPosts).post(protect,createPost)

router.route('/request').get(protect,getRequest)


router.route('/request/:id').post(protect, addRequest)

router.route('/:id').get(protect,getUserPosts)

export default router