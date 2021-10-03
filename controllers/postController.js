import Post from './../models/postModel.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'
import mongoose from 'mongoose'

const getPosts= catchAsync(async(req,res,next)=>{

    const keyword= req.query.keyword? {
        gameName: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {};

    const posts= await Post.find(keyword);

    const postsRefined= posts.map(item => {
        const container = {};
        
        container.gameName= item.gameName;
        container.date= item.date;
        container.from= item.from;
        container.to= item.to;
        container.image= item.image
        container._id= item._id
        container.playersRequired= item.playersRequired

        return container;
    })

    res.json({ posts: postsRefined})
})

const createPost= catchAsync(async(req,res,next)=>{
    const { gameName, date , from , to ,playersRequired } = req.body

    // console.log(req.user);
    
    let editedGameName= gameName.split(' ')[0];

    editedGameName= editedGameName.toLowerCase(editedGameName)

    let image= `/api/images/${editedGameName}.jpg`;

    const post = await Post.create({
        gameName,
        date,
        from,
        to,
        playersRequired,
        image,
        user: req.user._id 
    })

    res.json({
        post
    })    
})

const getUserPosts= catchAsync(async(req,res,next)=>{

    // console.log(req.params.id,req.user._id)
    if(!req.user._id.equals(req.params.id))
    return next(new AppError('You are not authorized to view this page', 403));

    const userId= mongoose.Types.ObjectId(req.params.id);

    // console.log(userId)

    const posts= await Post.find({ user: userId })

    const usersPosts = posts.map(item => {
        const container = {};
        
        container.gameName= item.gameName;
        container.date= item.date;
        container.from= item.from;
        container.to= item.to;
        
        return container;
    })

    res.json({posts: usersPosts})
})

export{
    getPosts,
    createPost,
    getUserPosts
}