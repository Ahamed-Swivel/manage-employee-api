import { Request, Response } from "express";
import { Employee } from "../models/employee";

class EmployeeController {
    public async createEmployee(req: Request, res: Response): Promise<void> {
        try {
            const employee = new Employee(req.body);
            await employee.save();
            res.status(201).send(employee);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    public async getEmployees(req: Request, res: Response): Promise<void> {
        try {
            const employees = await Employee.find();
            res.status(200).send(employees);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async getEmployeeById(req: Request, res: Response): Promise<void> {
        try {
            const { empId } = req.params
            const employee = await Employee.findById(empId);

            if (!employee) {
                res.status(404).send("Employee not found");
            } else {
                res.status(200).send(employee);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async deleteEmployee(req: Request, res: Response): Promise<void> {
        try {
            const { empId } = req.params
            const employee = await Employee.findOneAndDelete({ _id: empId });

            if (!employee) {
                res.status(404).send("Employee not found");
            } else {
                res.status(200).send(employee);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    }

    public async updateEmployeeId(req: Request, res: Response): Promise<void> {
      try {
          const { empId } = req.params
          const employee = await Employee.findByIdAndUpdate(
            empId,
            req.body,
            { new: true }
          );

          if (!employee) {
            res.status(404).json({ message: "User not found" });
          } else {
            res.status(200).json(employee);
          }
      } catch (error) {
          res.status(500).send(error);
      }
    }
}

export default new EmployeeController();
