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
  @EventPattern('auth_event')
  async listEvent(data) {
    console.log('Event listening: ', data);
  }

  // listen to event and return a response
  @MessagePattern({ cmd: 'is_user_auth' })
  async isUserAuth(data) {
    console.log('Is User Auth:', data);
    return false;
  }
}
