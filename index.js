console.log('Hello World')
const express = require('express')
const mongoose = require('mongoose')
const PORT = 3000
const app = express()
const authRouter = require('./routes/auth')
const adminRouter = require('./routes/admin')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
require('dotenv').config(); 

const DB = process.env.MONGODB_URI;
app.use(express.json())
app.use(authRouter);
app.use(adminRouter)
app.use(productRouter)
app.use(userRouter)

mongoose.connect(DB).then(()=>{
    console.log('Connection successfull')
}).catch((e) => {
    console.log(`Error: ${e}`)
})

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Connected at port ${PORT}`)
})

app.get('/', (req, res) => {
    res.send("This is the main route of express mart")
})
