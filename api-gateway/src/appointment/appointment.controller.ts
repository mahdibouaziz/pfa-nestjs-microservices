import { Controller, Get } from '@nestjs/common';
import { GetAuthorization } from 'src/custom-decorators/get-authorization';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/test-auth')
  testAuth(@GetAuthorization() authorization) {
    return this.appointmentService.testAuth(authorization);
  }
}
