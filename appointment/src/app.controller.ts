import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Role } from './authorization/role.enum';
import { Roles } from './authorization/roles.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Roles(Role.Nurse)
  @Post('/test-auth')
  testAuth(@Body() body) {
    return this.appService.testAuth(body);
  }

  @Get('/appointment')
  getAppointment() {
    return this.appService.getAppointment();
  }
}
