import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';

const url = 'http://auth:3000';

@Injectable()
export class AuthService {
  async registerDoctor(registerDoctorDto: RegisterDoctorDto, authorization) {
    try {
      let headers = {};
      if (authorization) {
        headers = {
          authorization,
        };
      }
      const response = await axios.post(
        `${url}/doctor/register`,
        registerDoctorDto,
        {
          headers,
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
      let headers = {};
      if (authorization) {
        headers = {
          authorization,
        };
      }
      const response = await axios.post(`${url}/doctor/login`, loginDoctorDto, {
        headers,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }

  async getAllDoctors(skip = 0, limit = 15, filter = '', authorization) {
    try {
      let headers = {};
      if (authorization) {
        headers = {
          authorization,
        };
      }
      const response = await axios.get(
        `${url}/doctor/all?skip=${skip}&limit=${limit}&filter=${filter}`,
        {
          headers,
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }

  async registerPatient(registerPatientDto: RegisterPatientDto, authorization) {
    try {
      let headers = {};
      if (authorization) {
        headers = {
          authorization,
        };
      }
      const response = await axios.post(
        `${url}/patient/register`,
        registerPatientDto,
        {
          headers,
        },
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  }

  // async loginPatient(loginPatientDto: LoginPatientDto, authorization) {
  //   try {
  //     let headers = {};
  //     if (authorization) {
  //       headers = {
  //         authorization,
  //       };
  //     }
  //     const response = await axios.post(
  //       `${url}/patient/login`,
  //       loginPatientDto,
  //       {
  //         headers,
  //       },
  //     );
  //     // console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error.response.data);
  //     throw error.response.data;
  //   }
  // }
}
