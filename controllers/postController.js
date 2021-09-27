import Post from './../models/postModel.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'

const getPosts= catchAsync(async(req,res,next)=>{
    const posts= await Post.find();

    res.json({ posts })
})

const createPost= catchAsync(async(req,res,next)=>{
    const { gameName, date , from , to ,playersRequired } = req.body

    // console.log(from,to)

    const image= `/api/images/${gameName}.jpg`;

    const post = await Post.create({
        gameName,
        date,
        from,
        to,
        playersRequired,
        image
    })

    res.json({
        post
    })    
})

export{
    getPosts,
    createPost
}