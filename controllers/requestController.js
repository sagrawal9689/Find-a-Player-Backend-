import Post from './../models/postModel.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'

const addRequest= catchAsync(async(req,res,next)=>{

    const { gameID, phoneNumber }= req.body;

    const postId= req.params.id;

    // console.log(gameID,phoneNumber)
    
    const post= await Post.findOne({ _id: postId });

    // console.log(post)

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

    res.send(updatedPost)
})

export{
    addRequest
}