import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getAppointment() {
    try {
      const response = await axios.get('http://appointment:3000/appointment');
      console.log('RESPONSE DATA: ', response.data);
      return {
        success: 'This is a good response',
      };
    } catch (err) {
      console.log(err);
    }
  }
}
