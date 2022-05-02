import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';

import { AppModule } from '../../../app.module';

describe('Appointment Controller', () => {
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

    await dbConnection.collection('appointments').deleteMany({});

    httpServer = app.getHttpServer();
  });

  beforeEach(async () => {
    await dbConnection.collection('appointments').deleteMany({});

    //
  });

  afterAll(async () => {
    // clear the collection
    await dbConnection.collection('appointments').deleteMany({});
    // close the connection to the app
    await app.close();
  });

  describe('Register appointment', () => {
    it('register with doctor payload ', async () => {
      //
    });

    it('register with patient payload (must fails)', async () => {
      //
    });

    it('register with nurse payload', async () => {
      //
    });
  });

  describe('get appointments (mine)', () => {
    it('get my appointments with patient payload', async () => {
      //
    });

    it('get my appointments with doctor payload', async () => {
      //
    });

    it('get my appointments without an account (must fail)', async () => {
      //
    });
  });

  describe('get all appoitnments per day', () => {
    it('get all appointments per dar with patient payload (must fails)', async () => {
      //
    });

    it('get all appointments per day with nurse payload', async () => {
      //
    });

    it('get all appointments per day with doctor payload ', async () => {
      //
    });
  });
});
