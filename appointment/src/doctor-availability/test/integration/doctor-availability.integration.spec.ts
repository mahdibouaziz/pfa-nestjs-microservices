import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import { Connection } from 'mongoose';
import { DatabaseService } from '../../../database/database.service';

import { AppModule } from '../../../app.module';

describe('Doctor Availability Controller', () => {
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

    await dbConnection.collection('doctoravailabilities').deleteMany({});

    httpServer = app.getHttpServer();
  });

  beforeEach(async () => {
    await dbConnection.collection('doctoravailabilities').deleteMany({});

    //
  });

  afterAll(async () => {
    // clear the collection
    await dbConnection.collection('doctors').deleteMany({});
    // close the connection to the app
    await app.close();
  });

  describe('Register doctor availability', () => {
    it('register with doctor payload ', async () => {
      //
    });

    it('register with patient payload (must fails)', async () => {
      //
    });

    it('register with nurse payload (must fails) ', async () => {
      //
    });
  });

  describe('get doctor availability (mine)', () => {
    it('get doctor availability with patient payload (must fails)', async () => {
      //
    });

    it('get doctor availability with nurse payload (must fails)', async () => {
      //
    });

    it('get doctor availability with doctor payload ', async () => {
      //
    });

    it('get doctor availability with doctor payload on a specific day ', async () => {
      //
    });
  });

  describe('get all doctors availability', () => {
    it('get doctor availability with patient payload (must fails)', async () => {
      //
    });

    it('get doctor availability with nurse payload', async () => {
      //
    });

    it('get doctor availability with doctor payload ', async () => {
      //
    });

    it('get doctor availability with doctor payload on specific day ', async () => {
      //
    });
  });

  describe('delete doctor availability', () => {
    it('delete doctor availability with patient payload (must fails)', async () => {
      //
    });

    it('delete doctor availability with nurse payload (must fails)', async () => {
      //
    });

    it('delete doctor availability with the other doctor payload (must fails) ', async () => {
      //
    });

    it('delete doctor availability with the same doctor payload ', async () => {
      //
    });

    it('delete doctor availability  with wrong availabilityID (must fials) ', async () => {
      //
    });
  });
});
