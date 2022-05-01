import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/authenticate')
  authenticateUser(@Request() req) {
    // this must return the payload of the user if he is authenticated or throw an error (Unauthorized)
    return req.user;
  }

  // listen to event and return a response
  @MessagePattern({ cmd: 'is_user_auth' })
  async isUserAuth(data) {
    console.log('Is User Auth:', data);
    return false;
  }
}
