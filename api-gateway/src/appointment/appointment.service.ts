import { Injectable } from '@nestjs/common';
import { getRequest } from 'src/request-utils/request-util';

// const url = 'http://appointment:3000';
const authUrl = 'http://auth:3000/authenticate';

@Injectable()
export class AppointmentService {
  async test(authorization) {
    return await getRequest(`${authUrl}`, authorization);
  }
}
