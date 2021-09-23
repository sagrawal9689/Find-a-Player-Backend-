import mongoose from 'mongoose'


const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    gameName: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    from: {
      type: Date,
      required: true,
    },
    to: {
        type: Date,
        required: true,
    },  
    playersRequired: {
      type: Number,
      required: true,
      default: 0
    }
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
