import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

// this service will return a conneciton to the database

@Injectable()
export class DatabaseService {
  constructor(@InjectConnection() private readonly connection: Connection) {}
  getDBHandle(): Connection {
    return this.connection;
  }
}
