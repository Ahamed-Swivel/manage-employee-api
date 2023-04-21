import {describe, expect, test} from '@jest/globals';
import mongoose from 'mongoose';
import request from "supertest";

import app from "../src/index";
import { Employee } from './models/employee';

// Mock the Employee model
jest.mock("../src/models/employee");

describe("EmployeeController", () => {
  const employeeData = {
    firstName: "Johncar",
    lastName: "Doedear",
    email: "john.doe@example.com",
    number: "0123456789",
    gender: "M",
    photo: "https://example.com/photo.jpg",
  };

  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL || '');
  });

  afterEach(async () => {
    await Employee.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('createEmployee', () => {
    it('should create a new employee', async () => {
      const response = await request(app).post('/api/employees').send(employeeData);

      expect(response.status).toBe(201);
      expect(response.body.firstName).toBe(employeeData.firstName);
      expect(response.body.lastName).toBe(employeeData.lastName);
      expect(response.body.email).toBe(employeeData.email);
      expect(response.body.number).toBe(employeeData.number);
      expect(response.body.gender).toBe(employeeData.gender);
      expect(response.body.photo).toBe(employeeData.photo);
    });

    it('should return 400 if request body is invalid, with no contact', async () => {
      const invalidEmployee = {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        gender: "M",
        photo: "https://example.com/photo.jpg",
      };
      const response = await request(app)
        .post('/api/employees')
        .send(invalidEmployee);

      expect(response.status).toBe(400);
    });
  });

  describe('deleteEmployee', () => {
    it('should delete an existing employee', async () => {
      const employee = new Employee(employeeData);
      await employee.save();
console.log(employee);

      const response = await request(app).delete(`/employees/${employee.id}`);

      expect(response.status).toBe(200);
      expect(response.body.firstName).toBe(employeeData.firstName);
      expect(response.body.lastName).toBe(employeeData.lastName);
      expect(response.body.email).toBe(employeeData.email);
      expect(response.body.number).toBe(employeeData.number);
      expect(response.body.gender).toBe(employeeData.gender);
      expect(response.body.photo).toBe(employeeData.photo);

      const deletedEmployee = await Employee.findById(employee._id);
      expect(deletedEmployee).toBeNull();
    });

    it('should return 404 if employee does not exist', async () => {
      const response = await request(app).delete(
        `/api/employees/${new mongoose.Types.ObjectId()}`
      );

      expect(response.status).toBe(404);
    });
  });

  // describe("getEmployees", () => {
  //   it("should return a list of employees", async () => {
  //     // Mock the find method of the Employee model
  //     Employee.find.mockResolvedValueOnce([employeeData]);

  //     const response = await request(app).get("/api/employees");

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual([employeeData]);
  //     expect(Employee.find).toHaveBeenCalledWith();
  //   });
  // });

  // describe("getEmployeeById", () => {
  //   it("should return an employee by ID", async () => {
  //     // Mock the findById method of the Employee model
  //     Employee.findById.mockResolvedValueOnce(employeeData);

  //     const response = await request(app).get("/api/employees/1");

  //     expect(response.status).toBe(200);
  //     expect(response.body).toEqual(employeeData);
  //     expect(Employee.findById).toHaveBeenCalledWith("1");
  //   });

  //   it("should handle not found errors", async () => {
  //     // Mock the findById method of the Employee model to return null
  //     Employee.findById.mockResolvedValueOnce(null);

  //     const response = await request(app).get("/api/employees/1");

  //     expect(response.status).toBe(404);
  //     expect(response.text).toEqual("Employee not found");
  //     expect(Employee.findById).toHaveBeenCalledWith("1");
  //   });
  // });
});


// import request from 'supertest';
// import { app } from '../app';
// import { Employee } from '../models/employee';
// import mongoose from 'mongoose';

// describe('EmployeeController', () => {
//   beforeAll(async () => {
//     await mongoose.connect(process.env.MONGO_URL || '', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false,
//     });
//   });

//   afterEach(async () => {
//     await Employee.deleteMany({});
//   });

//   afterAll(async () => {
//     await mongoose.connection.close();
//   });

//   describe('createEmployee', () => {
//     it('should create a new employee', async () => {
//       const employee = {
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         age: 30,
//       };
//       const response = await request(app).post('/employees').send(employee);

//       expect(response.status).toBe(201);
//       expect(response.body.name).toBe(employee.name);
//       expect(response.body.email).toBe(employee.email);
//       expect(response.body.age).toBe(employee.age);
//     });

//     it('should return 400 if request body is invalid', async () => {
//       const invalidEmployee = {
//         name: 'John Doe',
//         email: 'not_an_email',
//         age: 'thirty',
//       };
//       const response = await request(app)
//         .post('/employees')
//         .send(invalidEmployee);

//       expect(response.status).toBe(400);
//     });
//   });

//   describe('deleteEmployee', () => {
//     it('should delete an existing employee', async () => {
//       const employee = new Employee({
//         name: 'John Doe',
//         email: 'johndoe@example.com',
//         age: 30,
//       });
//       await employee.save();

//       const response = await request(app).delete(`/employees/${employee._id}`);

//       expect(response.status).toBe(200);
//       expect(response.body.name).toBe(employee.name);
//       expect(response.body.email).toBe(employee.email);
//       expect(response.body.age).toBe(employee.age);

//       const deletedEmployee = await Employee.findById(employee._id);
//       expect(deletedEmployee).toBeNull();
//     });

//     it('should return 404 if employee does not exist', async () => {
//       const response = await request(app).delete(
//         `/employees/${mongoose.Types.ObjectId()}`
//       );

//       expect(response.status).toBe(404);
//     });
//   });