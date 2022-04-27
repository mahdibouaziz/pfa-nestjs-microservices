import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // listen to event
  @EventPattern('list_appointment')
  async listAppointment(data) {
    console.log(data);
  }

  // listen to event and return a response
  @MessagePattern({ cmd: 'get_appointment' })
  async getAppointment(data) {
    console.log(data);
    return 'message wseell mriguel';
  }
}
