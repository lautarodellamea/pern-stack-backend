import express from 'express'
import morgan from 'morgan'
// me parsea la cookie ya que express no puede obtenerla por si solo
import cookieParser from 'cookie-parser'

import taskRoutes from './routes/tasks.routes.js'
import authRoutes from './routes/auth.routes.js'

const app = express()

// MIDDLEWARES
// para ver informacion de las consultas al servidor
app.use(morgan('dev'))
app.use(cookieParser())
// si llega algo en formato json lo convierte a js
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ROUTES
app.get('/', (req, res) => res.json({ message: 'Welcome to my API' }))
app.use('/api', taskRoutes)
app.use('/api', authRoutes)

// simulamos un error
// app.get("/test", (req,res) => {
//   throw new Error("my custom error!")
//   res.send("test")
// })

// ERROR HANDLER
// cuando hay algun error
app.use((err, req, res, next) => {
  res.status(500).json({ status: 'error', message: err.message })
})

export default app
