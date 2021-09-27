import mongoose from 'mongoose'


const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'User',
    },
    gameName: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
    to: {
        type: String,
        required: true,
    },  
    playersRequired: {
      type: Number,
      required: true,
      default: 0
    },
    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
