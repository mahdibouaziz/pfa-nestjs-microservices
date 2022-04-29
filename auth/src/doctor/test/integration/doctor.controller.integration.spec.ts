import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import { doctorStub } from '../stubs/doctor.stub';
import { AppModule } from '../../../app.module';

describe('Doctor Controller', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    // create the entire app and initialize it
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    // create a connection to the database
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDBHandle();

    httpServer = app.getHttpServer();
  });

  beforeEach(async () => {
    // clear the collection
    await dbConnection.collection('doctors').deleteMany({});
  });

  afterAll(async () => {
    // close the connection to the app
    await app.close();
  });

  describe('getAllDoctors', () => {
    it('should return an object that contains a key data that contains an array of doctors', async () => {
      // insert doctor in the DB
      //   await dbConnection.collection('doctors').insertOne(doctorStub());
      // register a doctor
      const registerResponse = await request(httpServer)
        .post('/doctor/register')
        .send(doctorStub());
      //   console.log('REGISTERED Doctor: ', registerResponse.body.doctor);

      //   login and get a token
      const loginRequest = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorStub().email,
          password: doctorStub().password,
        });
      const token = loginRequest.body.accessToken;

      const response = await request(httpServer)
        .get('/doctor/all')
        .set('Authorization', `Bearer ${token}`);
      console.log(response.body);
      //   expect(response.status).toBe(200);
      //   expect(response.body.data).toMatchObject([doctorStub()]);
      //   expect(response.body.totalItems).toEqual(1);
      //   expect(response.body.totalPages).toEqual(1);
    });

    // more tests
  });
});
