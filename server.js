import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import globalErrorHandler from './controllers/errorController.js'
import authRoutes from './routes/authRoutes.js'
import postRoutes from './routes/postRoutes.js'

dotenv.config({path: './config.env'})

connectDB()

const app = express()


app.use(express.json())

app.get('/',(req,res)=>{
  res.send("Hello")
})

app.use('/api/auth',authRoutes)
app.use('/api',postRoutes)

app.use(globalErrorHandler)
const __dirname = path.resolve()
app.use('/api/images', express.static(path.join(__dirname , '/Images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  )
)
