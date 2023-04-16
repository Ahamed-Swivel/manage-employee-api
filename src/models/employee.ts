import { createEmployee } from "../db/employees"

export default class Employee {
  id: string

  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public number: string,
    public gender: string,
    public photo: string,
  ) {
    this.id = Date.now().toString()
  }

  async createNewEmployee() {
    const newEmployee = await createEmployee({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      number: this.number,
      gender: this.gender,
      photo: this.photo,
    })

    return newEmployee
  }
}
