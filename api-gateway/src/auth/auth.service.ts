import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

const url = 'http://auth:3000';

@Injectable()
export class AuthService {
  async registerDoctor(registerDoctorDto: RegisterDoctorDto) {
    try {
      const response = await axios.post(
        `${url}/doctor/register`,
        registerDoctorDto,
      );
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
      // console.log(error);
    }
  }
}
