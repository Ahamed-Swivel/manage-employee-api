import express from "express";
import mongoose from 'mongoose';
import swaggerUi from 'swagger-ui-express';

import config from "./config";
import employeesRoutes from "./routes/employeesRoutes";
import swaggerSpec from "./swagger";

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

const app = express();

app.use(express.json());
app.use("/api/employees", employeesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//Connect to the database before listening
connectDB().then(() => {
    app.listen(config.port, () => {
        console.log(`Server is listening on port ${config.port}`);
    });
})
