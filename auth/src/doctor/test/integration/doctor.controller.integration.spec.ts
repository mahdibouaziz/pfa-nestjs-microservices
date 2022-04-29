import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import { doctorAdminStub } from '../stubs/doctor.stub';
import { AppModule } from '../../../app.module';
import * as bcrypt from 'bcrypt';

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

  //   beforeEach(async () => {

  //   });

  afterAll(async () => {
    // clear the collection
    await dbConnection.collection('doctors').deleteMany({});
    // close the connection to the app
    await app.close();
  });

  describe('getAllDoctors', () => {
    it('login an existing doctor to the DB with admin privileges', async () => {
      // insert doctor in the DB with the right credentials
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(doctorAdminStub().password, salt);
      await dbConnection
        .collection('doctors')
        .insertOne({ ...doctorAdminStub(), salt, password });

      //   login and get a token
      const loginResponse = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorAdminStub().email,
          password: doctorAdminStub().password,
        });

      const token = loginResponse.body.accessToken;
      expect(loginResponse.status).toBe(201);
      expect(loginResponse.body.accessToken).toBeTruthy();

      //   expect(response.body.data).toMatchObject([doctorStub()]);
      //   expect(response.body.totalItems).toEqual(1);
      //   expect(response.body.totalPages).toEqual(1);

      //   register a doctor
      //   const registerResponse = await request(httpServer)
      //     .post('/doctor/register')
      //     .send(doctorStub());
      //   console.log('REGISTERED Doctor: ', registerResponse.body.doctor);

      //   const response = await request(httpServer)
      //     .get('/doctor/all')
      //     .set('Authorization', `Bearer ${token}`);
      //   console.log(response.body);
      //   expect(response.status).toBe(200);
      //   expect(response.body.data).toMatchObject([doctorStub()]);
      //   expect(response.body.totalItems).toEqual(1);
      //   expect(response.body.totalPages).toEqual(1);
    });

    // more tests
    // login an existing doctor to the DB with admin privileges
    // the admin doctor will create a new  doctor account without admin privileges
    // the non admin doctor will create a new  doctor account (it must fails)

    // the admin doctor will create a new create a nurse account without admin privileges
    // the non admin nurse will create a new  doctor account (it must fails)

    // login the doctor / nurse with valid credentials
    // login the doctor / nurse wuth wrong credentials
  });
});
