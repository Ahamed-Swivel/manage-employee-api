import mongoose from "mongoose";
import AddEmployeeDto from "../dtos/createEmployee";

const EmployeeSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  number: { type: String, require: true },
  gender: { type: String, require: true },
  photo: { type: String, require: true }
})

export const EmployeeModel = mongoose.model('Employee', EmployeeSchema, "Employee")

export const getEmployees = (): Promise<AddEmployeeDto[]> => EmployeeModel.find()
export const getEmployeeById = (id: String) =>
  EmployeeModel.findById(id)
export const createEmployee = (values: Record<string, string>)=> 
  new EmployeeModel(values).save().then((employee) => employee.toObject())
export const deleteEmployeeById = (id: String): Promise<AddEmployeeDto | null> =>
  EmployeeModel.findOneAndDelete({ _id: id })
export const updateEmployeeById = (id: String, values: Record<string, string>) =>
  EmployeeModel.findByIdAndUpdate(id, values)

