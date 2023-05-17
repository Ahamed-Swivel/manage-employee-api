import {beforeAll, describe, expect} from '@jest/globals';
import request from "supertest";
import app from './app';

// Mock the Employee model
jest.mock("../src/models/employee");

interface IToken {
  token?: string
}

describe('DELETE /api/employees/:empId', () => {
  let auth: IToken = {};
  beforeAll(getToken(auth));

  it('should return 404 if employee is not found', async () => {
    const response = await request(app)
      .delete('/api/employees/614ac8b23e09e108d78e2890')
      .set('Authorization', `bearer ${auth.token}`);

    expect(response.status).toBe(404);
    expect(response.text).toBe('Employee not found');
  });

  it('should return 500 if empId is invalid', async () => {
    const response = await request(app)
      .delete('/api/employees/invalid-empId')
      .set('Authorization', `bearer ${auth.token}`);

    expect(response.status).toBe(404);
  });
});

describe('POST /api/employees', () => {
  let auth: IToken = {};
  beforeAll(getToken(auth));

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
      .set('Authorization', `bearer ${auth.token}`)
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
      .set('Authorization', `bearer ${auth.token}`)
      .send(invalidEmployee);

    expect(response.status).toBe(400);
  });
});


describe('GET /api/employees', () => {
  let auth: IToken = {};
  beforeAll(getToken(auth));

  it('should return a list of employees', async () => {
    await request(app).get('/api/employees')
      .set('Authorization', `bearer ${auth.token}`)
      .then(response => {
        expect(response.status).toBe(200);
      })
  });
});

function getToken(auth: IToken) {
  return function(done: Function) {
      request(app)
          .post('/api/employees/get-token')
          .send()
          .expect(200)
          .end(onResponse);

      function onResponse(err: any, res: any) {
          auth.token = res.body.token;
          return done();
      }
  };
}
