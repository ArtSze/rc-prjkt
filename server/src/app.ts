import express from 'express'
import cors from 'cors'
import helmet from 'helmet'

export const app = express()

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet())

// Routes
import { IndexRouter } from './routes/index'
import { UsersRouter } from './routes/users'
import { ProjectsRouter } from './routes/projects'
import { AuthRouter } from './routes/auth'
app.use('/user', UsersRouter)
app.use('/auth', AuthRouter)
app.use('/project', ProjectsRouter)
app.use('/', IndexRouter)