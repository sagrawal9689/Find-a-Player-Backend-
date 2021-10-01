import Post from './../models/postModel.js'
import catchAsync from './../utils/catchAsync.js'
import AppError from './../utils/appError.js'

const getPosts= catchAsync(async(req,res,next)=>{

    const keyword= req.query.keyword? {
        gameName: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    }: {};

    const posts= await Post.find(keyword);

    res.json({ posts })
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

export{
    getPosts,
    createPost
}