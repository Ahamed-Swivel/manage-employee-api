import { Request, Response } from "express"
import { deleteEmployeeById, getEmployeeById, getEmployees } from "../db/employees"

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const { empId } = req.params

    const employee = await getEmployeeById(empId)

    if (!employee) {
      return res.status(404).send('Invalid User');
    }

    return res.status(200).json(employee)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees= await getEmployees()

    return res.status(200).json(employees)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { empId } = req.params

    const deletedUser = await deleteEmployeeById(empId)

    return res.json(deletedUser)
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { empId } = req.params
    const {
      firstName,
      lastName,
      email,
      number,
      gender,
      photo,
    } = req.body

    if (
      !firstName ||
      !lastName ||
      !email ||
      !number ||
      !gender ||
      !photo
    ) {
      return res.status(400).send('Missing payload');
    }

    let employee = await getEmployeeById(empId)

    if (!employee) {
      return res.status(404).send('Invalid User');
    }

    employee.firstName = firstName
    employee.lastName = lastName
    employee.email = email
    employee.number = number
    employee.gender = gender
    employee.photo = photo

    await employee.save()

    return res.status(200).json(employee).end()
  } catch (error) {
    console.log(error)
    return res.sendStatus(400)
  }
}

