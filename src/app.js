import express from 'express'
import morgan from 'morgan'

const app = express()

// para ver informacion de las consultas al servidor
app.use(morgan("dev"))
// si llega algo en formato json lo convierte a js
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get("/", (req,res) => res.json({message: "Welcome to my API"}))

// simulamos un error
// app.get("/test", (req,res) => {
//   throw new Error("my custom error!")
//   res.send("test")
// })

// cuando hay algun error
app.use((err ,req, res, next) =>{
  res.status(500).json({status: "error", message: err.message});
})

export default app;