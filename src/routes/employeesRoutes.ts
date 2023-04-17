import { Router } from "express";

import EmployeeController from "../controller/EmployeeController";

const router = Router();

router.post("/", EmployeeController.createEmployee);
router.get("/", EmployeeController.getEmployees);
router.get("/:empId", EmployeeController.getEmployeeById);
router.delete('/:empId', EmployeeController.deleteEmployee);
router.patch('/:empId', EmployeeController.updateEmployeeId);

export default router;
