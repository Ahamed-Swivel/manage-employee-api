import { Employee, IEmployee } from "../models/employee";

class EmployeeRepository {
  public async createEmployee(employeeData: any): Promise<IEmployee> {
    const employee = new Employee(employeeData);
    await employee.save();
    return employee;
  }

  public getEmployees(): Promise<IEmployee[]> {
    return Employee.find();
  }

  public getEmployeeById(empId: string): Promise<IEmployee | null> {
    return Employee.findById(empId);
  }

  public deleteEmployee(empId: string): Promise<IEmployee | null> {
    return Employee.findOneAndDelete({ _id: empId });
  }

  public updateEmployeeById(empId: string, updateData: any): Promise<IEmployee | null> {
    return Employee.findByIdAndUpdate(empId, updateData, { new: true });
  }
}

export default EmployeeRepository;
