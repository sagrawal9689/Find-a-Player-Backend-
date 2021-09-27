import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import globalErrorHandler from './controllers/errorController.js'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config({path: './config.env'})

connectDB()

const app = express()


app.use(express.json())

app.get('/',(req,res)=>{
  res.send("Hello")
})

app.use('/api/users',userRoutes)
app.use('/api/posts',postRoutes)

app.use(globalErrorHandler)
const __dirname = path.resolve()
app.use('/api/images', express.static(path.join(__dirname , '/Images')));

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
