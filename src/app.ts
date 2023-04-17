import express from "express";
import mongoose from 'mongoose';

import config from "./config";
import employeesRoutes from "./routes/employeesRoutes";

const app = express();

app.use(express.json());
app.use("/api/employees", employeesRoutes);

app.listen(config.port, () => {
    console.log(`Server is listening on port ${config.port}`);
});

mongoose.Promise = Promise
mongoose.connect(config.databaseUrl)
mongoose.connection.on('error', (error: Error) => console.log(error))
