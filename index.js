const express = require('express')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT
const app = express()
const Database = require('./Database/index')
const RouteBooks = require('./routes/books')
const RouteUsers = require('./routes/users')

Database()
app.use(cors())
app.use(express.json())

// app.use(cors({
//     origin: "http://127.0.0.1:3000",
//     methods:["GET","POST","PUT","DELETE",],
//     allowedHeaders:["Content-Type"]
// }))

app.use('/books',RouteBooks )
app.use('/users',RouteUsers )

app.get('/', (req,res)=>{
    res.status(200).send("<h1>Hello Kawan<h1/>")
})

app.listen(port, ()=> {
    console.log(`App is listen in Port: ${port}`)
})


