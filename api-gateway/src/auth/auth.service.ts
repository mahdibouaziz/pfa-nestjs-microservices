import { Injectable } from '@nestjs/common';
import {
  deleteRequest,
  getRequest,
  postRequest,
} from 'src/request-utils/request-util';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';

const url = 'http://auth:3000';

@Injectable()
export class AuthService {
  async registerDoctor(registerDoctorDto: RegisterDoctorDto, authorization) {
    return await postRequest(
      `${url}/doctor/register`,
      registerDoctorDto,
      authorization,
    );
  }

  async loginDoctor(loginDoctorDto: LoginDoctorDto, authorization) {
    try {
      return await postRequest(
        `${url}/doctor/login`,
        loginDoctorDto,
        authorization,
      );
    } catch (error) {
      // console.log(error.response.data);
      return error.response.data;
    }
  }

  async getAllDoctors(skip = 0, limit = 15, filter = '', authorization) {
    return await getRequest(
      `${url}/doctor/all?skip=${skip}&limit=${limit}&filter=${filter}`,
      authorization,
    );
  }

  async deleteDoctorById(doctorId: string, authorization) {
    return await deleteRequest(
      `${url}/doctor/delete/${doctorId}`,
      {},
      authorization,
    );
  }

  async registerPatient(registerPatientDto: RegisterPatientDto, authorization) {
    try {
      console.log(registerPatientDto);
      return await postRequest(
        `${url}/patient/register`,
        registerPatientDto,
        authorization,
      );
    } catch (error) {
      // console.log(error.response.data);
      return error.response.data;
    }
  }

  async loginPatient(loginPatientDto: LoginPatientDto, authorization) {
    return await postRequest(
      `${url}/patient/login`,
      loginPatientDto,
      authorization,
    );
  }

  async getAllPatients(skip = 0, limit = 15, filter = '', authorization) {
    return await getRequest(
      `${url}/patient/all?skip=${skip}&limit=${limit}&filter=${filter}`,
      authorization,
    );
  }

  async deletePatientById(patientId: string, authorization) {
    return await deleteRequest(
      `${url}/patient/delete/${patientId}`,
      {},
      authorization,
    );
  }
}
