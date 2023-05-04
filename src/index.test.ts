import {describe, expect} from '@jest/globals';
import request from "supertest";
import mongoose from 'mongoose';
import app from './app';

// Mock the Employee model
jest.mock("../src/models/employee");

describe('DELETE /api/employees/:empId', () => {
  it('should return 404 if employee is not found', async () => {
    const response = await request(app).delete(
      '/api/employees/614ac8b23e09e108d78e2890'
    );

    expect(response.status).toBe(404);
    expect(response.text).toBe('Employee not found');
  });

  it('should return 500 if empId is invalid', async () => {
    const response = await request(app).delete('/api/employees/invalid-empId');

    expect(response.status).toBe(404);
  });
});

describe('POST /api/employees', () => {
  it('should create a new employee', async () => {
    const newEmployee = {
      firstName: "William",
      lastName: "Shakes",
      email: "shakes@example.com",
      number: "0123456789",
      gender: "M"
    };

    const response = await request(app)
      .post('/api/employees')
      .send(newEmployee);

    expect(response.status).toBe(201)
  });

  it('should return 400 if request body is invalid', async () => {
    const invalidEmployee = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'notanemail',
      number: '555-555-5555',
      gender: 'Male'
    };

    const response = await request(app)
      .post('/api/employees')
      .send(invalidEmployee);

    expect(response.status).toBe(400);
  });
});


describe('GET /api/employees', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.DATABASE_URL || '');
  });


  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('should return a list of employees', async () => {
    await request(app).get('/api/employees').then(response => {
      expect(response.status).toBe(200);
    })
  });
});
