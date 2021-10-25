import express from 'express'
const router = express.Router()
import {
  getPosts,
  createPost,
  getMyPosts,
  getMyAppliedPosts
} from '../controllers/postController.js'
import { addRequest, getRequests , approveRequest} from './../controllers/requestController.js';

import { protect } from '../middlewares/authMiddleware.js'

router.route('/posts').get(getPosts)                              // get all posts 

router.route('/posts/my').get(protect, getMyPosts)                // get all my posts

router.route('/post').post(protect,createPost)                    // create post

router.route('/post/:id/requests').get(protect,getRequests)         //   get all request of a post

router.route('/post/:id/request').post(protect,addRequest)         //   add request on a post

router.route('/posts/myApplied').get(protect,getMyAppliedPosts)    // get my applied posts

router.route('/post/:postid/request/:reqid/setStatus').post(protect,approveRequest) 


export default router