import cors from "cors";
import express from "express";
import swaggerUi from 'swagger-ui-express';

import employeesRoutes from "./routes/employeesRoutes";
import swaggerSpec from "./swagger";
import helmet from "helmet";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cors({
  origin: ['https://*.vercel.app'],
  optionsSuccessStatus: 200
}));
app.use("/api/employees", employeesRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
