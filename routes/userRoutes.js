import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  getProfile
} from '../controllers/userController.js'
import { protect } from './../middlewares/authMiddleware.js'

router.route('/login').post(authUser)

router.route('/').post(registerUser).get(protect,getProfile)

export default router