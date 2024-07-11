const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv").config()
const cors = require("cors")

const WomanDressRouter = require("./router/WomanDressRouter")
const ManDressRouter = require("./router/ManDressRouter")
const UserRouter = require("./router/UserRouter.js")
const authMiddleware = require("./middleware/token")
const OrderRouter = require("./router/OrderRouter.js")



mongoose.connect("mongodb+srv://atayucel:nilgunata184@atacluster.wqqdyed.mongodb.net/project?retryWrites=true&w=majority")
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log(err)) 

const app = express()

app.use(express.json())

app.use(cors({
    origin : "*"
}))


app.use("/user", UserRouter)
app.use("/man", ManDressRouter)
app.use("/woman",WomanDressRouter)
app.use("/order", OrderRouter)

app.use(authMiddleware)


app.get("/", (req,res) => {
  res.send("Its your first endpoint")
})

 

app.listen(3000,()=>{
  console.log(`Server is running on ${3000} port.`)
})
