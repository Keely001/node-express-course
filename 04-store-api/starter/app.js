//set up env

require('dotenv').config()

//packages

const express = require('express')
const app = express();

const connectDB = require('./db/connect')
const productsRouter = require('./routes/products')


const notFound = require('./middleware/not-found')
const errorMiddlew = require('./middleware/error-handler');

//middleware
app.use(express.json())

//routes

app.get('/', (req,res) =>{
    res.send('<h1> Store APi</h1><a href="/api/v1/products">products</a>')
})

app.use('/api/v1/products', productsRouter);

//products

app.use(notFound)
app.use(errorMiddlew)

const port = process.env.port || 3000;

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`listening to port ${port}`))
    }
    catch{
        console.log('db or port failed')
    }
}

start(); 
