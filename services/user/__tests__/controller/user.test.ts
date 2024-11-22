import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
process.env.PRIVATE_KEY=`-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`

process.env.PUBLIC_KEY=`-----BEGIN PUBLIC KEY-----
MIICITANBgkqhkiG9w0BAQEFAAOCAg4AMIICCQKCAgBX+dLtrmzgWt5oCSucUnpF
wPWEcynSRCZ+YY3oBQ1GGJJE/aDgAZJg/nMopky1ASrZQRzdK+mLOunpv03/yL52
G9Vu8dj2EiVsEIPmEd7AnXDmKHTGEJ/CasYfxejWQdMBWYzDC6Z9IEkP54Uca95Z
KWYJqlCs4BP/kg8PrgILUkZXwI7rhZBwirxK7OPCercniWFo8UZZvobHFU7C2ySf
eiM3GwjS1Uw64aPwilcNTGRlYm0kKm4jZbNLD7gKJ0P1ML+Nw++V1aWBghoVXAwM
3wfQ9VHpJcA2askr6BArHoHlar4Hx1fowU5aBOCkxeFKgZ/5OObWSxs053DhLAAO
TkHr3yBfCAx/kaX16TdSpX8PmfFWW4e4L08NLxcYVkhKem7v9+UZke8uyWHzLaeJ
H18aXyym+ey2DEGlhxktQIYDr/3A+VKVbdU8IraGWIGq4X7TJ0Sk67/78kLnqeoP
0XXso6/Is+Eu+L5WxRRWHBflNquyHyllBWTFUDUj39dz/BJVIn/d7nSAMlTe9ofH
Lug4lwvuzdBKeaqRpteknoTmHyvqXvKRhpT5HSlxgTXIZDYG8I3c636dBwFwfyHG
24Iw2oa2qHsPEKHwnpBshvdmrg62/oeKhcrnOsHPc8h4BV4C5GzAsJiUsSuqQRRT
p/b7hxtJbUz0+F800+dGLQIDAQAB
-----END PUBLIC KEY-----`

jest.mock('../../src/rabbitmq/sendMessage', () => ({
  
  sendMessage: async (x: any) => {},
}));
jest.mock('../../src/db/prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
  user: {
    create: (x: any) => {
      return x.data;
    },
  },
  prisma: {
    user: {
      create: (x: any) => {
        return x.data;
      },
      findUnique:(x: any) => {
        if(x.where.email==="asd@gmail.com")
            return {email:x.where.email,password:"$2b$10$fXN/6eg4HbuX0iAIVFE28.fN.pzPx//1pB2HAzA57/X54nIJxGYt2"};
        
      },
    },
  },
}));

import { app } from '../../src/server';

describe('User routes', () => {
  test('register ok', async () => {
    const res = await request(app).post('/users/register').send({ email: 'asd@gmail.com', password: 'asd' });
    expect(res.body).toHaveProperty('email', 'asd@gmail.com');
  });

  test('register no password', async () => {
    const res = await request(app).post('/users/register').send({ email: 'asd@gmail.com' });
    expect(res.body).toHaveProperty('errors.0.msg', 'password is required');
  });

  test('register no email', async () => {
    const res = await request(app).post('/users/register').send({ password: 'asd' });
    expect(res.body).toHaveProperty('errors.0.msg', 'email is required');
  });

  test('login ok', async () => {
    const res = await request(app).post('/users/login').send({ email: 'asd@gmail.com', password: 'asd' });
    expect(res.body).toHaveProperty('token');
  });

  test('login wrongPassword', async () => {
    const res = await request(app).post('/users/login').send({ email: 'asd@gmail.com', password: 'asdw' });
    expect(res.body).toHaveProperty('error', 'Invalid email or password');
  });

  test('login wrongEmail', async () => {
    const res = await request(app).post('/users/login').send({ email: 'asddw@gmail.com', password: 'asdw' });
    expect(res.body).toHaveProperty('error', 'Invalid email or password');
  });

  test('login no password', async () => {
    const res = await request(app).post('/users/login').send({ email: 'asd@gmail.com' });
    expect(res.body).toHaveProperty('errors.0.msg', 'password is required');
  });

  test('login no email', async () => {
    const res = await request(app).post('/users/login').send({ password: 'asd' });
    expect(res.body).toHaveProperty('errors.0.msg', 'email is required');
  });
});
