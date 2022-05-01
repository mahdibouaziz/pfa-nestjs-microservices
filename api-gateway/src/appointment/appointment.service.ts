import { Injectable } from '@nestjs/common';
import { getRequest, postRequest } from 'src/request-utils/request-util';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';

const url = 'http://appointment:3000';
const authUrl = 'http://auth:3000/authenticate';

@Injectable()
export class AppointmentService {
  async testAuth(authorization) {
    // this will return a payload or throw an error if we have an invalid token
    const payload = await getRequest(authUrl, authorization);

    return await postRequest(`${url}/test-auth`, { payload });
  }

  async registerDoctorAvailability(
    registerDoctorAvailabilityDto: RegisterDoctorAvailabilityDto,
    authorization,
  ) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);
    // console.log(payload);
    // send the data to the needed service
    return await postRequest(`${url}/doctor-availability/register`, {
      payload,
      registerDoctorAvailabilityDto,
    });
  }

  async getMyDoctorAvailability(day, authorization) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);

    const queryUrl = day ? `day=${day}` : '';
    console.log(queryUrl);

    return await postRequest(`${url}/doctor-availability/mine?${queryUrl}`, {
      payload,
    });
  }
}
