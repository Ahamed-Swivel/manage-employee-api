import mongoose from "mongoose";

import config from "./config";
import logger from "./logger";
import app from "./app";

mongoose.Promise = Promise

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(config.databaseUrl);
        logger.info(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        logger.error(error);
        process.exit(1);
    }
}

//Connect to the database before listening
connectDB().then(() => {
    app.listen(config.port, () => {
        logger.info(`Server is listening on port ${config.port}`);
    });
}).catch((error) => {
    logger.error(error);
})
