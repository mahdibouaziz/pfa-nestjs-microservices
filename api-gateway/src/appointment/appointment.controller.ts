import { Controller, Get } from '@nestjs/common';
import { GetAuthorization } from 'src/custom-decorators/get-authorization';
import { AppointmentService } from './appointment.service';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/test')
  test(@GetAuthorization() authorization) {
    return this.appointmentService.test(authorization);
  }
}
