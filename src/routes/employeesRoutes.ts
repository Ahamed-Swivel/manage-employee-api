import { Router } from "express";

import EmployeeController from "../controller/EmployeeController";
import validateEmployee from "../middleware/validation";

const router = Router();

router.post("/",validateEmployee, EmployeeController.createEmployee);
router.get("/", EmployeeController.getEmployees);
router.get("/:empId", EmployeeController.getEmployeeById);
router.delete('/:empId', EmployeeController.deleteEmployee);
router.patch('/:empId',validateEmployee, EmployeeController.updateEmployeeId);

export default router;
