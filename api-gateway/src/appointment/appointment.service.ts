import { Injectable } from '@nestjs/common';
import {
  deleteRequest,
  getRequest,
  postRequest,
} from 'src/request-utils/request-util';
import { RegisterAppointmentDto } from './dto/register-appointment.dto';
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

  async getMyDoctorAvailability(
    day,
    skip = 0,
    limit = 15,
    filter = '',
    authorization,
  ) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);

    const queryDayUrl = day ? `&day=${day}` : '';

    return await postRequest(
      `${url}/doctor-availability/mine?skip=${skip}&limit=${limit}&filter=${filter}${queryDayUrl}`,
      {
        payload,
      },
    );
  }

  async getAllDoctorAvailabilities(
    day,
    skip = 0,
    limit = 15,
    filter = '',
    authorization,
  ) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);

    const queryDayUrl = day ? `&day=${day}` : '';

    return await postRequest(
      `${url}/doctor-availability/all?skip=${skip}&limit=${limit}&filter=${filter}${queryDayUrl}`,
      {
        payload,
      },
    );
  }

  async deleteDoctorAvailabilityById(availabilityId, authorization) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);
    return await deleteRequest(
      `${url}/doctor-availability/delete/${availabilityId}`,
      {
        payload,
      },
    );
  }

  // all about appointments

  async registerAppointment(
    registerAppointmentDto: RegisterAppointmentDto,
    authorization,
  ) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);
    // console.log(payload);
    // send the data to the needed service

    return await postRequest(`${url}/appointment/register`, {
      payload,
      registerAppointmentDto,
    });
  }

  async getAllAppointments(
    day,
    skip = 0,
    limit = 15,
    filter = '',
    authorization,
  ) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);

    const queryDayUrl = day ? `&day=${day}` : '';

    return await postRequest(
      `${url}/appointment/all?skip=${skip}&limit=${limit}&filter=${filter}${queryDayUrl}`,
      {
        payload,
      },
    );
  }

  async getMyDoctorAppointments(date, authorization) {
    // authenticate the user
    const payload = await getRequest(authUrl, authorization);
    return await postRequest(`${url}/appointment/doctor/mine?date=${date}`, {
      payload,
    });
  }
}
