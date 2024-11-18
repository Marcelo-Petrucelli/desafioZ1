import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MainModule } from '../../src/modules/main.module';
import { DBService } from '../../src/services/main/main.database.service';

describe('AddressController (e2e)', () => {
  let app: INestApplication;
  let createdId: number;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();
    
    app = moduleFixture.createNestApplication();

    const dbService = app.get(DBService);
    app.use(dbService.createContext.bind(dbService));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('address/:id (GET)', () => {
    return request(app.getHttpServer())
    .get('/address/1')
    .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsby5jb20uYnIvbGljZW5zZSIsImF1ZCI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsbyIsImlhdCI6MTczMTkzNjY3NzMwMSwiZXhwIjoxNzM5MTM2Njc3MzAxLCJ1c2VyIjp7ImlkIjoxLCJmdWxsTmFtZSI6Ik1yLiBUZXN0ZSIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tLmJyIn19.Z2uXI471e5_lqniJ-MsApc0WpVBC2c2B6gMNTDOp0mw")
    //.query({ 'id': '1' })
    .expect(200)
    .expect({
      id: 1,
      cep: '13560001',
      state: 'SP',
      city: 'São Carlos',
      district: 'Centro',
      street: 'Avenida São Carlos',
      number: 10,
      ownerId: 1
    });
  });

  it('address/list (GET)', () => {
    return request(app.getHttpServer())
    .get('/address/list')
    .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsby5jb20uYnIvbGljZW5zZSIsImF1ZCI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsbyIsImlhdCI6MTczMTkzNjY3NzMwMSwiZXhwIjoxNzM5MTM2Njc3MzAxLCJ1c2VyIjp7ImlkIjoxLCJmdWxsTmFtZSI6Ik1yLiBUZXN0ZSIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tLmJyIn19.Z2uXI471e5_lqniJ-MsApc0WpVBC2c2B6gMNTDOp0mw")
    .expect(200)
    .then((res) => {
      expect(res.body).toBeInstanceOf(Array);
      
      const data = res.body;
      data.forEach((element: any) => { //Change later to match properties of GetAddressDTO with a loop
        expect(element).toHaveProperty('cep');
        expect(element).toHaveProperty('state');
        expect(element).toHaveProperty('city');
        expect(element).toHaveProperty('district');
        expect(element).toHaveProperty('street');
        expect(element).toHaveProperty('number');
        expect(element).toHaveProperty('ownerId');
      });
      return;
    });
  });

  it('address/create (GET)', () => {
    return request(app.getHttpServer())
    .post('/address/create')
    .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsby5jb20uYnIvbGljZW5zZSIsImF1ZCI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsbyIsImlhdCI6MTczMTkzNjY3NzMwMSwiZXhwIjoxNzM5MTM2Njc3MzAxLCJ1c2VyIjp7ImlkIjoxLCJmdWxsTmFtZSI6Ik1yLiBUZXN0ZSIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tLmJyIn19.Z2uXI471e5_lqniJ-MsApc0WpVBC2c2B6gMNTDOp0mw")
    .send({
      "cep": "13567480",
      "state": "SP",
      "city": "São Carlos",
      "district": "Lot. Albertini",
      "street": "Rua Ângelo Carduchi",
      "number": 65,
      "ownerId": 2
    })
    .expect(201)
    .expect({});
  });

  it('address/remove (GET)', () => {
    return request(app.getHttpServer())
    .delete('/address/remove/5') //Change here. This test will work only once. Maybe change Create, returning the ID of the created Address. Here we'd be able to use the created ID, for example.
    .set('Authorization', "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlzcyI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsby5jb20uYnIvbGljZW5zZSIsImF1ZCI6Imh0dHA6Ly9kZXNhZmlvWjEuZXhlbXBsbyIsImlhdCI6MTczMTkzNjY3NzMwMSwiZXhwIjoxNzM5MTM2Njc3MzAxLCJ1c2VyIjp7ImlkIjoxLCJmdWxsTmFtZSI6Ik1yLiBUZXN0ZSIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tLmJyIn19.Z2uXI471e5_lqniJ-MsApc0WpVBC2c2B6gMNTDOp0mw")
    .expect(202)
    .expect({});
  });
});