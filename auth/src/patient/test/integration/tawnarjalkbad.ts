import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';
import * as bcrypt from 'bcrypt';

import { AppModule } from '../../../app.module';
import { doctorAdminStub } from '../stubs/patient.stub';
import { patientStub } from '../stubs/patient.stub';

describe('Patient Controller', () => {
  let dbConnection: Connection;
  let httpServer: any;
  let app: any;

  beforeAll(async () => {
    //create an entire app and initialize it
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();

    // create a connection to the database
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDBHandle();

    await dbConnection.collection('patients').deleteMany({});
    await dbConnection.collection('doctors').deleteMany({});

    httpServer = app.getHttpServer();
  });

  afterAll(async () => {
    // clear the collection
    await dbConnection.collection('patients').deleteMany({});
    await dbConnection.collection('doctors').deleteMany({});
    // close the connection to the app
    await app.close();
  });

  describe('Login and Register Patients', () => {
    it('a doctor create patient', async () => {
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

      //create a patient
      const registerResponse = await request(httpServer)
        .post('/patient/register')
        .send(patientStub())
        .set('Authorization', `Bearer ${loginResponse.body.accessToken}`);

      //   console.log('RESPONSE: ', registerResponse.body);
      //   console.log('RESPONSE: ', registerResponse.status);

      expect(registerResponse.status).toBe(201);
      expect(registerResponse.body.message).toBeTruthy();
      expect(registerResponse.body.patient).toBeTruthy();
    });

    it('login patient with valid credentials', async () => {
      //
    });

    it('login patient with wrong credentials (must fails)', async () => {
      //
    });

    it('a patient create patient (must fails)', async () => {
      //
    });

    it('create patient - without an acocunt (must fails)', async () => {
      //
    });
  });

  describe('Get all Patients', () => {
    //
  });

  describe('delete Patients', () => {
    //
  });
});
