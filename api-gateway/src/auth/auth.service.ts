import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

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
      // console.log(error);
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
      // console.log(error);
    }
  }
}
