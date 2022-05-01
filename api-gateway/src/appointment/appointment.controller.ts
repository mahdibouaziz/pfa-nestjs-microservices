import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetAuthorization } from 'src/custom-decorators/get-authorization';
import { AppointmentService } from './appointment.service';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/test-auth')
  testAuth(@GetAuthorization() authorization) {
    return this.appointmentService.testAuth(authorization);
  }

  // All about doctors availability
  @Post('/doctor-availability/register')
  registerDoctorAvailability(
    @Body() registerDoctorAvailabilityDto: RegisterDoctorAvailabilityDto,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.registerDoctorAvailability(
      registerDoctorAvailabilityDto,
      authorization,
    );
  }
}
