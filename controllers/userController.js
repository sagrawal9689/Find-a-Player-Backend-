import jwt from 'jsonwebtoken'
import catchAsync from './../utils/catchAsync.js'
import User from './../models/userModel.js'
import AppError from './../utils/appError.js'

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });
};
  
const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);
      
    // Remove password from output
    user.password = undefined;
  
    res.status(statusCode).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token
    });
};


const authUser= catchAsync(async(req,res,next)=>{

    const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email });


  if (!user || !(await user.matchPassword(password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, res);
})

const registerUser = catchAsync (async(req, res,next) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    return next(new AppError('User already exists',400))
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  if (user) {
    createSendToken(user,201,res)
  } else {
    return next(new AppError('Please provide correct detail',400))
  }
})

const getProfile = catchAsync (async(req, res,next) => {
  const { name, email } = req.user

  res.status(200).json({
    name,
    email
  })
})

export{
  registerUser,
  authUser,
  getProfile
}