import { Router } from "express"

import { deleteEmployee, getAllEmployees, getEmployee, updateEmployee } from "../controller/employee"

const router: Router = Router()

router.get('/', getAllEmployees)
router.get('/:empId', getEmployee)
router.delete('/:empId', deleteEmployee)
router.patch('/:empId', updateEmployee)

export default router
