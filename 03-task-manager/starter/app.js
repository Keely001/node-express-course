const express = require('express');
const app = express()
const tasks = require('./routes/tasks');
require('dotenv').config()
const connectDB = require('./db/connect')
app.use(express.json());

app.get('/hello', (req,res) => {
    res.send('tupo site. kata simu!!')
})

app.use('/api/v1/tasks', tasks)








const port  = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log('I am up...')
        })
    }catch(error)
    {
        console.log(error)
    }
}

start();

