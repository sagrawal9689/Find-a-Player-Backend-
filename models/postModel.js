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
    },
    request: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'User',
        },
        gameID:{
          type: String,
          required: true
        },
        phoneNumber:{
          type: Number
        },
        status:{
          type: String,
          default: "none"
        }
      }
    ]
  },
  {
    timestamps: true,
  }
)

const Post = mongoose.model('Post', postSchema)

export default Post
