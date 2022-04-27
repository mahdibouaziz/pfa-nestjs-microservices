import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('APPOINTMENT_SERVICE') private appointmentQueue: ClientProxy,
  ) {}

  getHello(): string {
    this.appointmentQueue.emit('list_appointment', {
      appointment: 'The Way Of Kings',
      author: 'Brandon Sanderson',
    });
    return 'Hello World!';
  }
}
