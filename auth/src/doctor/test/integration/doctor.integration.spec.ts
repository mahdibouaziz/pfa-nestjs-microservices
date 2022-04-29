import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import { doctorAdminStub, doctorStub } from '../stubs/doctor.stub';
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

      expect(loginResponse.status).toBe(201);
      expect(loginResponse.body.accessToken).toBeTruthy();
    });

    it('the admin doctor will create a new  doctor account without admin privileges', async () => {
      // get the admin doctor and attach to it a token
      const loginResponse = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorAdminStub().email,
          password: doctorAdminStub().password,
        });
      // console.log(loginResponse.body.accessToken);

      //create a doctor without admin privileges
      const registerResponse = await request(httpServer)
        .post('/doctor/register')
        .send(doctorStub())
        .set('Authorization', `Bearer ${loginResponse.body.accessToken}`);
      // console.log(registerResponse.body);

      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body.doctor).toBeTruthy();
      expect(registerResponse.body.doctor.firstname).toBeTruthy();
    });

    // more tests

    // the non admin doctor will create a new  doctor account (it must fails)

    // the admin doctor will create a new create a nurse account without admin privileges
    // the non admin nurse will create a new  doctor account (it must fails)

    // login the doctor / nurse with valid credentials
    // login the doctor / nurse wuth wrong credentials
  });
});
