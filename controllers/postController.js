import Post from './../models/postModel.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'

const getPosts= catchAsync(async(req,res,next)=>{
    const posts= await Post.find();

    res.json({ posts })
})

export{
    getPosts
}