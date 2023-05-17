import { Request, Response, NextFunction } from "express";
import { validateEmployeeJoi } from "../repository/validatorRepository";

const validateEmployee = (req: Request, res: Response, next: NextFunction): any => {
  const {error} = validateEmployeeJoi(req.body)

  if (error) {
    return res.send(error.details);
  }

  next();
};

export default validateEmployee
