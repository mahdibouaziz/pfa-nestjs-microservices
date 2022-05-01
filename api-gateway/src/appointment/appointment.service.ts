import { Injectable } from '@nestjs/common';
import { getRequest, postRequest } from 'src/request-utils/request-util';

const url = 'http://appointment:3000';
const authUrl = 'http://auth:3000/authenticate';

@Injectable()
export class AppointmentService {
  async testAuth(authorization) {
    // this will return a payload or throw an error if we have an invalid token
    const payload = await getRequest(`${authUrl}`, authorization);

    return await postRequest(`${url}/test-auth`, { payload }, {});
  }
}
