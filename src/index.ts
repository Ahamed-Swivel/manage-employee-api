import mongoose from 'mongoose';

import config from "./config";
import app from "./app";

mongoose.Promise = Promise

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseUrl);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}


//Connect to the database before listening
connectDB().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}`);
    });
})
