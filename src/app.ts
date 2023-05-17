import cors from "cors";
import express from "express";
import swaggerUi from 'swagger-ui-express';

import employeesRoutes from "./routes/employeesRoutes";
import swaggerSpec from "./swagger";

const app = express();

app.use(express.json());
app.use(cors({
  origin: ['https://*.vercel.app'],
  optionsSuccessStatus: 200
}));
app.use("/api/employees", employeesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
