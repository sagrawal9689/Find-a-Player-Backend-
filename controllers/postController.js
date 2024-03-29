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

    res.send(postsRefined)
})

const createPost= catchAsync(async(req,res,next)=>{
    const { gameName, date , from , to ,playersRequired } = req.body

    if(!gameName || !date || !from || !to || !playersRequired )
    return next(new AppError('Please provide correct info.', 400));
    
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

    res.status(201).send(post)    
})

const getMyPosts= catchAsync(async(req,res,next)=>{

    const posts= await Post.find({ user: req.user._id })

    const usersPosts = posts.map(item => {
        const container = {};
        
        container.gameName= item.gameName;
        container.date= item.date;
        container.from= item.from;
        container.to= item.to;
        container._id= item._id
        
        return container;
    })

    res.json(usersPosts)
})

const getMyAppliedPosts= catchAsync(async(req,res,next)=>{

    const { _id:userId }= req.user

    // console.log(userId)

    const posts= await Post.find({});
    
    let postAppliedByMe= posts.filter((post)=>{

        return post.request.find((req)=>{
            return req.user.equals(userId)
        })
    })

    postAppliedByMe= postAppliedByMe.map((post)=>{
        const { gameName, date,from,to }=post;
        const reqIdx= post.request.findIndex((req)=> req.user.equals(userId))

        const { status }= post.request[reqIdx];

        return { gameName,date, from,to,status };
    })

    res.send(postAppliedByMe);
})

export{
    getPosts,
    createPost,
    getMyPosts,
    getMyAppliedPosts
}