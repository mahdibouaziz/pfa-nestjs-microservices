import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';

const url = 'http://auth:3000';

@Injectable()
export class AuthService {
  async registerDoctor(registerDoctorDto: RegisterDoctorDto, authorization) {
    try {
      const response = await axios.post(
        `${url}/doctor/register`,
        registerDoctorDto,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }

  async loginDoctor(loginDoctorDto: LoginDoctorDto, authorization) {
    try {
      const response = await axios.post(`${url}/doctor/login`, loginDoctorDto, {
        headers: {
          authorization: authorization,
        },
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }

  async registerPatient(registerPatientDto: RegisterPatientDto, authorization) {
    try {
      const response = await axios.post(
        `${url}/patient/register`,
        registerPatientDto,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }

  async loginPatient(loginPatientDto: LoginPatientDto, authorization) {
    try {
      const response = await axios.post(
        `${url}/patient/login`,
        loginPatientDto,
        {
          headers: {
            authorization: authorization,
          },
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }
}
