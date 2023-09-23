require('dotenv').config()
require('express-async-errors')

// async error

const express = require('express');

const app = express();

const connectDB = require('./db/connect')

const productsRouter = require('./routes/products')
const errorMiddleware = require('./middleware/error-handler')
const notFoundMiddleware = require('./middleware/not-found');

//middleware
app.use(express.static('./public'))

app.use(express.json())


//routes

app.get('/',(req,res) => {
    res.send('<h1>Store API</h1><a href="/api/v1/products">Products routes </a>')
})


app.use('/api/v1/products',productsRouter)
//products routes

app.use(errorMiddleware);
app.use(notFoundMiddleware);


const port  = process.env.PORT || 3000
const start = async () => {
    try {
        // connectDb
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is running on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}

start();