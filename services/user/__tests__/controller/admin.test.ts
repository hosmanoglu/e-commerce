import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { mockDeep } from 'jest-mock-extended';
jest.mock('../../src/rabbitmq/sendMessage', () => ({
  
  sendMessage: async (x: any) => {},
}));

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
      createMany: (x: any) => {
        return x.data;
      },
      findUnique: (x: any) => {
        return {
          email: 'asd@gmail.com',
          id: '570965b4-89f4-42fb-aca0-b6638acac951',
        };
      },
      findMany: (x: any) => {
        return [{ email: 'asd@gmail.com', id: '570965b4-89f4-42fb-aca0-b6638acac951' }];
      },
      delete: (x: any) => {
        return [{ email: 'asd@gmail.com', id: '570965b4-89f4-42fb-aca0-b6638acac951' }];
      },
    },
  },
}));

import { app } from '../../src/server';

describe('User routes', () => {
  test('create no auth', async () => {
    const res = await request(app)
      .post('/admin/users/create')

      .send({ users: [{ email: 'asd@gmail.com', password: 'asd' }] });
    expect(res.statusCode).toEqual(401);
  });

  test('create ok', async () => {
    const res = await request(app)
      .post('/admin/users/create')
      .set(
        'authorization',
        'bearar eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNWIxMGRjLWY3M2EtNGNjNC1hZWM2LWJhN2VhOWU1NjBlOSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MzIxMDAxNDl9.RFDIYYGhboZRYjpLpywzIhxCs833l1YtmhBoNyNeK0BPWXfekMt1Q9lBAYxButcmzTLQU4svi_YgEdpFd8h6yXrz4j8SYzJ7AlpnGg9h8Jp0ceprp2tP4UtP3xQgOxc18igvF0p1gp24UdVF5CtD0S5dfnUOGWoiqLqDrbPCOt1jDohAAiloKLk6OrsNyLD4fwY2Y45AJQZg-trNLx5okqRtz4jciFPs4R9U-Iro9RTpSq8BECItaEWFexx15IkYRz-eXILKyLtdNIbb0y_rJWEC0SZFMNRingmDADIDd1QFtpkBal-471npi-dA9TilpWDX7edkKqPL1UTpOCzvNWOPTmcDTbvVFR1X2_ojnm_EAbEjVHaKkhJzx7QnDoaUMQ9c-9lrniFCCKVr3z42uxYEImC7HF4k3867Q9iuySF8rwFvmkIbk8cIV1JzV04RTXrNEtJWbJ7BHal9vL1jUqsaG6fZFLLn58mmmqkADXJuy5_7OiBT24FszvfkXX9ZaqegV-VOHWpOdxnCERG5CjBkWucl0utQKLUm8kx7CDCHdL93-Y2K-rw1rmKJDu9qLsbCy9_LuFWVSRs6rXy7C6tTOX5mmksACNXrI60NVvmiOmxc2U1KuCPz0QbR-dLvnTPHx0ubO_ODLjxmRnTMBib-LIdT8LWOPT9kC53Hgjk',
      )
      .send({ users: [{ email: 'asd@gmail.com', password: 'asd' }] });
    expect(res.statusCode).toEqual(200);
  });

  test('create no password', async () => {
    const res = await request(app)
      .post('/admin/users/create')
      .set(
        'authorization',
        'bearar eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNWIxMGRjLWY3M2EtNGNjNC1hZWM2LWJhN2VhOWU1NjBlOSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MzIxMDAxNDl9.RFDIYYGhboZRYjpLpywzIhxCs833l1YtmhBoNyNeK0BPWXfekMt1Q9lBAYxButcmzTLQU4svi_YgEdpFd8h6yXrz4j8SYzJ7AlpnGg9h8Jp0ceprp2tP4UtP3xQgOxc18igvF0p1gp24UdVF5CtD0S5dfnUOGWoiqLqDrbPCOt1jDohAAiloKLk6OrsNyLD4fwY2Y45AJQZg-trNLx5okqRtz4jciFPs4R9U-Iro9RTpSq8BECItaEWFexx15IkYRz-eXILKyLtdNIbb0y_rJWEC0SZFMNRingmDADIDd1QFtpkBal-471npi-dA9TilpWDX7edkKqPL1UTpOCzvNWOPTmcDTbvVFR1X2_ojnm_EAbEjVHaKkhJzx7QnDoaUMQ9c-9lrniFCCKVr3z42uxYEImC7HF4k3867Q9iuySF8rwFvmkIbk8cIV1JzV04RTXrNEtJWbJ7BHal9vL1jUqsaG6fZFLLn58mmmqkADXJuy5_7OiBT24FszvfkXX9ZaqegV-VOHWpOdxnCERG5CjBkWucl0utQKLUm8kx7CDCHdL93-Y2K-rw1rmKJDu9qLsbCy9_LuFWVSRs6rXy7C6tTOX5mmksACNXrI60NVvmiOmxc2U1KuCPz0QbR-dLvnTPHx0ubO_ODLjxmRnTMBib-LIdT8LWOPT9kC53Hgjk',
      )
      .send({ users: [{ email: 'asd@gmail.com' }] });
    expect(res.body).toHaveProperty('errors.0.msg', 'password is required');
  });

  test('create no email', async () => {
    const res = await request(app)
      .post('/admin/users/create')
      .set(
        'authorization',
        'bearar eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNWIxMGRjLWY3M2EtNGNjNC1hZWM2LWJhN2VhOWU1NjBlOSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MzIxMDAxNDl9.RFDIYYGhboZRYjpLpywzIhxCs833l1YtmhBoNyNeK0BPWXfekMt1Q9lBAYxButcmzTLQU4svi_YgEdpFd8h6yXrz4j8SYzJ7AlpnGg9h8Jp0ceprp2tP4UtP3xQgOxc18igvF0p1gp24UdVF5CtD0S5dfnUOGWoiqLqDrbPCOt1jDohAAiloKLk6OrsNyLD4fwY2Y45AJQZg-trNLx5okqRtz4jciFPs4R9U-Iro9RTpSq8BECItaEWFexx15IkYRz-eXILKyLtdNIbb0y_rJWEC0SZFMNRingmDADIDd1QFtpkBal-471npi-dA9TilpWDX7edkKqPL1UTpOCzvNWOPTmcDTbvVFR1X2_ojnm_EAbEjVHaKkhJzx7QnDoaUMQ9c-9lrniFCCKVr3z42uxYEImC7HF4k3867Q9iuySF8rwFvmkIbk8cIV1JzV04RTXrNEtJWbJ7BHal9vL1jUqsaG6fZFLLn58mmmqkADXJuy5_7OiBT24FszvfkXX9ZaqegV-VOHWpOdxnCERG5CjBkWucl0utQKLUm8kx7CDCHdL93-Y2K-rw1rmKJDu9qLsbCy9_LuFWVSRs6rXy7C6tTOX5mmksACNXrI60NVvmiOmxc2U1KuCPz0QbR-dLvnTPHx0ubO_ODLjxmRnTMBib-LIdT8LWOPT9kC53Hgjk',
      )
      .send({ users: [{ password: 'asd' }] });
    expect(res.body).toHaveProperty('errors.0.msg', 'email is required');
  });

  test('users get ok', async () => {
    const res = await request(app)
      .get('/admin/users')
      .set(
        'authorization',
        'bearar eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNWIxMGRjLWY3M2EtNGNjNC1hZWM2LWJhN2VhOWU1NjBlOSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MzIxMDAxNDl9.RFDIYYGhboZRYjpLpywzIhxCs833l1YtmhBoNyNeK0BPWXfekMt1Q9lBAYxButcmzTLQU4svi_YgEdpFd8h6yXrz4j8SYzJ7AlpnGg9h8Jp0ceprp2tP4UtP3xQgOxc18igvF0p1gp24UdVF5CtD0S5dfnUOGWoiqLqDrbPCOt1jDohAAiloKLk6OrsNyLD4fwY2Y45AJQZg-trNLx5okqRtz4jciFPs4R9U-Iro9RTpSq8BECItaEWFexx15IkYRz-eXILKyLtdNIbb0y_rJWEC0SZFMNRingmDADIDd1QFtpkBal-471npi-dA9TilpWDX7edkKqPL1UTpOCzvNWOPTmcDTbvVFR1X2_ojnm_EAbEjVHaKkhJzx7QnDoaUMQ9c-9lrniFCCKVr3z42uxYEImC7HF4k3867Q9iuySF8rwFvmkIbk8cIV1JzV04RTXrNEtJWbJ7BHal9vL1jUqsaG6fZFLLn58mmmqkADXJuy5_7OiBT24FszvfkXX9ZaqegV-VOHWpOdxnCERG5CjBkWucl0utQKLUm8kx7CDCHdL93-Y2K-rw1rmKJDu9qLsbCy9_LuFWVSRs6rXy7C6tTOX5mmksACNXrI60NVvmiOmxc2U1KuCPz0QbR-dLvnTPHx0ubO_ODLjxmRnTMBib-LIdT8LWOPT9kC53Hgjk',
      );
    expect(res.statusCode).toEqual(200);
  });

  test('users  getbyid ', async () => {
    const res = await request(app)
      .get('/admin/users/570965b4-89f4-42fb-aca0-b6638acac951')
      .set(
        'authorization',
        'bearar eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNWIxMGRjLWY3M2EtNGNjNC1hZWM2LWJhN2VhOWU1NjBlOSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MzIxMDAxNDl9.RFDIYYGhboZRYjpLpywzIhxCs833l1YtmhBoNyNeK0BPWXfekMt1Q9lBAYxButcmzTLQU4svi_YgEdpFd8h6yXrz4j8SYzJ7AlpnGg9h8Jp0ceprp2tP4UtP3xQgOxc18igvF0p1gp24UdVF5CtD0S5dfnUOGWoiqLqDrbPCOt1jDohAAiloKLk6OrsNyLD4fwY2Y45AJQZg-trNLx5okqRtz4jciFPs4R9U-Iro9RTpSq8BECItaEWFexx15IkYRz-eXILKyLtdNIbb0y_rJWEC0SZFMNRingmDADIDd1QFtpkBal-471npi-dA9TilpWDX7edkKqPL1UTpOCzvNWOPTmcDTbvVFR1X2_ojnm_EAbEjVHaKkhJzx7QnDoaUMQ9c-9lrniFCCKVr3z42uxYEImC7HF4k3867Q9iuySF8rwFvmkIbk8cIV1JzV04RTXrNEtJWbJ7BHal9vL1jUqsaG6fZFLLn58mmmqkADXJuy5_7OiBT24FszvfkXX9ZaqegV-VOHWpOdxnCERG5CjBkWucl0utQKLUm8kx7CDCHdL93-Y2K-rw1rmKJDu9qLsbCy9_LuFWVSRs6rXy7C6tTOX5mmksACNXrI60NVvmiOmxc2U1KuCPz0QbR-dLvnTPHx0ubO_ODLjxmRnTMBib-LIdT8LWOPT9kC53Hgjk',
      );
    expect(res.statusCode).toEqual(200);
  });

  test('users deletebyid', async () => {
    const res = await request(app)
      .delete('/admin/users/570965b4-89f4-42fb-aca0-b6638acac951')
      .set(
        'authorization',
        'bearar eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNkNWIxMGRjLWY3M2EtNGNjNC1hZWM2LWJhN2VhOWU1NjBlOSIsImFkbWluIjp0cnVlLCJpYXQiOjE3MzIxMDAxNDl9.RFDIYYGhboZRYjpLpywzIhxCs833l1YtmhBoNyNeK0BPWXfekMt1Q9lBAYxButcmzTLQU4svi_YgEdpFd8h6yXrz4j8SYzJ7AlpnGg9h8Jp0ceprp2tP4UtP3xQgOxc18igvF0p1gp24UdVF5CtD0S5dfnUOGWoiqLqDrbPCOt1jDohAAiloKLk6OrsNyLD4fwY2Y45AJQZg-trNLx5okqRtz4jciFPs4R9U-Iro9RTpSq8BECItaEWFexx15IkYRz-eXILKyLtdNIbb0y_rJWEC0SZFMNRingmDADIDd1QFtpkBal-471npi-dA9TilpWDX7edkKqPL1UTpOCzvNWOPTmcDTbvVFR1X2_ojnm_EAbEjVHaKkhJzx7QnDoaUMQ9c-9lrniFCCKVr3z42uxYEImC7HF4k3867Q9iuySF8rwFvmkIbk8cIV1JzV04RTXrNEtJWbJ7BHal9vL1jUqsaG6fZFLLn58mmmqkADXJuy5_7OiBT24FszvfkXX9ZaqegV-VOHWpOdxnCERG5CjBkWucl0utQKLUm8kx7CDCHdL93-Y2K-rw1rmKJDu9qLsbCy9_LuFWVSRs6rXy7C6tTOX5mmksACNXrI60NVvmiOmxc2U1KuCPz0QbR-dLvnTPHx0ubO_ODLjxmRnTMBib-LIdT8LWOPT9kC53Hgjk',
      );
    expect(res.statusCode).toEqual(200);
  });
});
