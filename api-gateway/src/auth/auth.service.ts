import { Injectable } from '@nestjs/common';
import { get, post } from 'src/request-utils/resuest-util';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';

const url = 'http://auth:3000';

@Injectable()
export class AuthService {
  async registerDoctor(registerDoctorDto: RegisterDoctorDto, authorization) {
    return await post(
      `${url}/doctor/register`,
      registerDoctorDto,
      authorization,
    );
  }

  async loginDoctor(loginDoctorDto: LoginDoctorDto, authorization) {
    return await post(`${url}/doctor/login`, loginDoctorDto, authorization);
  }

  async getAllDoctors(skip = 0, limit = 15, filter = '', authorization) {
    return await get(
      `${url}/doctor/all?skip=${skip}&limit=${limit}&filter=${filter}`,
      authorization,
    );
  }

  async registerPatient(registerPatientDto: RegisterPatientDto, authorization) {
    return await post(
      `${url}/patient/register`,
      registerPatientDto,
      authorization,
    );
  }

  async loginPatient(loginPatientDto: LoginPatientDto, authorization) {
    return await post(`${url}/patient/login`, loginPatientDto, authorization);
  }

  async getAllPatients(skip = 0, limit = 15, filter = '', authorization) {
    return await get(
      `${url}/patient/all?skip=${skip}&limit=${limit}&filter=${filter}`,
      authorization,
    );
  }
}
