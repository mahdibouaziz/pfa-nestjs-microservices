import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import {
  doctorAdminStub,
  doctorStub,
  doctorStub1,
  patientStub,
} from '../stubs/doctor.stub';
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

  describe('Login and Register Doctors', () => {
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

      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body.doctor).toBeTruthy();
      expect(registerResponse.body.doctor.firstname).toBeTruthy();
    });

    it('the non admin doctor will create a new  doctor account (it must fails)', async () => {
      // get the admin doctor and attach to it a token
      const loginResponse = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorStub1().email,
          password: doctorStub1().password,
        });
      console.log(loginResponse.body.accessToken);

      //create a doctor without admin privileges
      const registerResponse = await request(httpServer)
        .post('/doctor/register')
        .send(doctorStub1())
        .set('Authorization', `Bearer ${loginResponse.body.accessToken}`);

      expect(registerResponse.status).toBe(401);
      expect(registerResponse.body.error).toEqual('Unauthorized');
    });

    it('login the doctor with valid credentials', async () => {
      const loginResponse = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorStub().email,
          password: doctorStub().password,
        });

      expect(loginResponse.status).toBe(201);
      expect(loginResponse.body.accessToken).toBeTruthy();
    });

    it('login the doctor with wrong credentials (must fails)', async () => {
      const loginResponse = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorStub1().email,
          password: doctorStub().password,
        });

      // console.log(loginResponse.body);

      expect(loginResponse.status).toBe(401);
      expect(loginResponse.body.error).toEqual('Unauthorized');
    });
  });

  describe('Get all doctors', () => {
    it('fetch the doctors - with an admin account', async () => {
      // get the admin doctor and attach to it a token
      const loginResponse = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorAdminStub().email,
          password: doctorAdminStub().password,
        });

      // get all the doctors
      const fetchResponse = await request(httpServer)
        .get('/doctor/all')
        .set('Authorization', `Bearer ${loginResponse.body.accessToken}`);

      expect(fetchResponse.status).toBe(200);
      expect(fetchResponse.body.data).toBeTruthy();
      expect(fetchResponse.body.totalItems).toBeTruthy();
      expect(fetchResponse.body.totalPages).toBeTruthy();
    });

    it('fetch the doctors - with a doctor account', async () => {
      // get the doctor and attach to it a token
      const loginResponse = await request(httpServer)
        .post('/doctor/login')
        .send({
          email: doctorStub().email,
          password: doctorStub().password,
        });

      // get all the doctors
      const fetchResponse = await request(httpServer)
        .get('/doctor/all')
        .set('Authorization', `Bearer ${loginResponse.body.accessToken}`);

      expect(fetchResponse.status).toBe(200);
      expect(fetchResponse.body.data).toBeTruthy();
      expect(fetchResponse.body.totalItems).toBeTruthy();
      expect(fetchResponse.body.totalPages).toBeTruthy();
    });

    it('fetch the doctors - with a patient account (must fails)', async () => {
      // create a patient account
      await dbConnection.collection('patients').insertOne({ ...patientStub() });
      // login to the patient account and get a token
      const loginResponse = await request(httpServer)
        .post('/patient/login')
        .send({
          cin: patientStub().cin,
          birthday: patientStub().birthday,
        });

      // get all the doctors
      const fetchResponse = await request(httpServer)
        .get('/doctor/all')
        .set('Authorization', `Bearer ${loginResponse.body.accessToken}`);

      console.log(fetchResponse.body);

      expect(fetchResponse.status).toBe(401);
      expect(fetchResponse.body.error).toEqual('Unauthorized');
    });

    it('fetch the doctors - without an account (must fails)', async () => {
      // get all the doctors
      const fetchResponse = await request(httpServer).get('/doctor/all');

      expect(fetchResponse.status).toBe(401);
      expect(fetchResponse.body.message).toEqual('Unauthorized');
    });
  });

  describe('Delete doctors', () => {
    it('delete the doctor - with an admin account', async () => {
      //
    });
    it('delete the doctor - with doctor account', async () => {
      //
    });

    it('delete the doctor - without a patient account (must fails)', async () => {
      //
    });

    it('delete the doctor - without an account (must fails)', async () => {
      //
    });
  });
});
