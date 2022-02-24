import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import path from 'path'

import { routes } from './routes/routes'

dotenv.config()

const app = express()

/**
 * Database setup
 */
mongoose.connect(process.env.MONGO_URI)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
)

app.use(routes)

app.listen(3000)
