import express from 'express'
const router = express.Router()
import {
  getPosts,
  createPost,
  getUserPosts,
  getMyAppliedPosts
} from '../controllers/postController.js'
import { addRequest, getRequest , approveRequest} from './../controllers/requestController.js';

import { protect } from '../middlewares/authMiddleware.js'

router.route('/').get(getPosts).post(protect,createPost)

router.route('/request').get(protect,getRequest)                    //   get all request of a particular post

router.route('/request/setstatus').post(protect,approveRequest)

router.route('/request/:id').post(protect, addRequest)               // get a single particular request belonging to a post 

router.route('/myApplied').get(protect,getMyAppliedPosts)

router.route('/:id').get(protect,getUserPosts)


export default router