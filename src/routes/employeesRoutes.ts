import { Router } from "express";

import EmployeeController from "../controller/EmployeeController";
import validateEmployee from "../middleware/validation";

const router = Router();

/**
 * @openapi
 * /api/employees:
 *  get:
 *    tags:
 *      - Employee
 *    summary: Get all employees
 *    responses:
 *      200:
 *        description: Success
 *        schema:
 *          type: array
 *          items:
 *            $ref: '#/components/schemas/Employee'
 *      500:
 *        description: Internal Server Error
 *  post:
 *    tags:
 *      - Employee
 *    summary: Create a new employee
 *    parameters:
 *      - in: body
 *        name: body
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/Employee'
 *    responses:
 *      201:
 *        description: Created
 *        schema:
 *          $ref: '#/components/schemas/CreateEmployeeResponse'
 *      400:
 *        description: Bad Request
 * /api/employees/{empId}:
 *  get:
 *    tags:
 *      - Employee
 *    summary: Get an employee by ID
 *    parameters:
 *      - name: empId
 *        in: path
 *        description: ID of the employee to retrieve
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Employee details
 *        schema:
 *          $ref: '#/components/schemas/CreateEmployeeResponse'
 *      404:
 *        description: Employee not found
 *      500:
 *        description: Server error
 *  delete:
 *    tags:
 *      - Employee
 *    summary: Delete an employee by ID
 *    parameters:
 *      - name: empId
 *        in: path
 *        description: ID of the employee to delete
 *        required: true
 *        type: string
 *    responses:
 *      200:
 *        description: Deleted employee details
 *        schema:
 *          $ref: '#/components/schemas/CreateEmployeeResponse'
 *      404:
 *        description: Employee not found
 *      500:
 *        description: Server error
 *  patch:
 *    tags:
 *      - Employee
 *    summary: Update an employee by ID
 *    parameters:
 *      - name: empId
 *        in: path
 *        description: ID of the employee to update
 *        required: true
 *        type: string
 *      - name: body
 *        in: body
 *        description: Employee details to update
 *        required: true
 *        schema:
 *          $ref: '#/components/schemas/UpdateEmployeeBody'
 *    responses:
 *      200:
 *        description: Updated employee details
 *        schema:
 *          $ref: '#/components/schemas/CreateEmployeeResponse'
 *      404:
 *        description: Employee not found
 *      500:
 *        description: Server error
 */
router.post("/",validateEmployee, EmployeeController.createEmployee);
router.get("/", EmployeeController.getEmployees);
router.get("/:empId", EmployeeController.getEmployeeById);
router.delete('/:empId', EmployeeController.deleteEmployee);
router.patch('/:empId',validateEmployee, EmployeeController.updateEmployeeId);

export default router;
