import Post from './../models/postModel.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'
import mongoose from 'mongoose'

const addRequest= catchAsync(async(req,res,next)=>{

    const { gameID, phoneNumber }= req.body;

    const postId= req.params.id;

    // console.log(gameID,phoneNumber)
    
    const post= await Post.findOne({ _id: postId });

    // console.log(post)

    if(!post)
    {
        return next(new AppError("No post found with that Id", 404));
    }

    const containsCurrentUserRequest= post.request.find((currReq)=> {
        
        // console.log(currReq.user,req.user._id)
        // console.log()
        return currReq.user.equals(req.user._id);
     });

    // console.log(containsCurrentUserRequest)

    if(containsCurrentUserRequest)
    {
        return next(new AppError('You have already requested to join this game.',400))
    }

    const updatedPost= await Post.findOneAndUpdate(
    { _id: postId }, 
    { $push: { 
                request: {
                    gameID,
                    phoneNumber,
                    user: req.user._id
                }  
            } 
    },
    {new: true})

    res.send(updatedPost.request)
})

const getRequests= catchAsync(async(req,res,next)=>{
    

    const postId= req.params.id;
    

    const post= await Post.findOne({ _id : postId , user: req.user._id})

    // console.log(post)

    if(!post)
    {
        return next(new AppError("No post found with that Id", 404));
    }

    res.send(post.request)
})

const approveRequest= catchAsync(async(req,res,next)=>{
    
    
    const { status }= req.body;

    const { postid, reqid }= req.params

    const post= await Post.findOne({ _id : postid , user: req.user._id})

    if(!post)
    {
        return next(new AppError("No post found with that Id", 404));
    }

    const idx= post.request.findIndex((req)=> req._id.equals(reqid))

    // console.log(idx)

    if(idx===-1)
    {
        return next(new AppError("No request found with that Id", 404));
    }

    if(!(status==="approved" || status==="declined"))
    {
        return next(new AppError("Give valid status", 404));
    }
    
    post.request[idx].status= status;

    await post.save()

    res.send("success");
})

export{
    addRequest,
    getRequests,
    approveRequest
}