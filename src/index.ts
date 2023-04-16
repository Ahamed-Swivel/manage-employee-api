import express from 'express';
import mongoose from 'mongoose';

import employeeRouter from "./routers/employees";

const DB_URL = 'mongodb+srv://ahamedignite:rZnd7YopgJC206us@cluster0.bl8hdw6.mongodb.net/?retryWrites=true&w=majority'
const app = express()
const port: number = 3000

app.use(express.json())
app.use('/api/employees', employeeRouter)

app.listen(port, () => {
  console.log('Server started!')
})

mongoose.Promise = Promise
mongoose.connect(DB_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))
