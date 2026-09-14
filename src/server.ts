import express from 'express'
import "dotenv/config"
import taskRoutes from "./taskRoutes"

const app = express()

app.use(express.json())
app.use(taskRoutes)

app.listen(3000, () =>{
    console.log("Servidor rodando na porta 3000")
})