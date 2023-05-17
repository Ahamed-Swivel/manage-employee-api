import { Request, Response } from "express";

import logger from "../logger";
import EmployeeRepository from "../repository/EmployeeRepository";

class EmployeeController {
  public async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const employee = await new EmployeeRepository().createEmployee(req.body);
      res.status(201).send(employee);
    } catch (error) {
      logger.error(error);
      res.status(400).send(error);
    }
  }

  public async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const employees = await new EmployeeRepository().getEmployees();
      res.status(200).send(employees);
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }

  public async getEmployeeById(req: Request, res: Response): Promise<void> {
    try {
      const { empId } = req.params;
      const employee = await new EmployeeRepository().getEmployeeById(empId);

      if (!employee) {
        res.status(404).send("Employee not found");
      } else {
        res.status(200).send(employee);
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }

  public async deleteEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { empId } = req.params;
      const employee = await new EmployeeRepository().deleteEmployee(empId);

      if (!employee) {
        res.status(404).send("Employee not found");
      } else {
        res.status(200).send(employee);
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }

  public async updateEmployeeId(req: Request, res: Response): Promise<void> {
    try {
      const { empId } = req.params;
      const employee = await new EmployeeRepository().updateEmployeeById(
        empId,
        req.body
      );

      if (!employee) {
        res.status(404).json({ message: "Employee not found" });
      } else {
        res.status(200).json(employee);
      }
    } catch (error) {
      logger.error(error);
      res.status(500).send(error);
    }
  }
}

export default new EmployeeController();
