const request = require('supertest');
const app = require('../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Clean up database before tests
beforeAll(async () => {
  await prisma.calculation.deleteMany({});
});

// Clean up database after tests
afterAll(async () => {
  await prisma.calculation.deleteMany({});
  await prisma.$disconnect();
});

describe('Math API Endpoints', () => {
  test('Addition endpoint returns correct sum', async () => {
    const response = await request(app)
      .post('/api/addition')
      .send({ num1: 5, num2: 3 });
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('result', 8);
  });

  test('Factorial endpoint returns correct factorial', async () => {
    const response = await request(app)
      .get('/api/factorial/5');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('result', 120);
  });

  test('Fibonacci endpoint returns correct sequence', async () => {
    const response = await request(app)
      .get('/api/fibonacci/5');
    
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('result');
    expect(response.body.result).toEqual([0, 1, 1, 2, 3]);
  });
});