import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GetAuthorization } from '../custom-decorators/get-authorization';

import { AppointmentService } from './appointment.service';
import { RegisterAppointmentDto } from './dto/register-appointment.dto';
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
    console.log('test: ', registerDoctorAvailabilityDto);
    return this.appointmentService.registerDoctorAvailability(
      registerDoctorAvailabilityDto,
      authorization,
    );
  }

  @Get('/doctor-availability/all')
  getAllDoctorAvailabilitiesPerWeekDay(
    @Query('day') day: number,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.getAllDoctorAvailabilitiesPerWeekDay(
      day,
      authorization,
    );
  }

  // @Get('/doctor-availability/mine')
  // getMyDoctorAvailability(
  //   @Query('day') day: string,
  //   @Query() { skip, limit, filter }: PaginationParams,
  //   @GetAuthorization() authorization,
  // ) {
  //   return this.appointmentService.getMyDoctorAvailability(
  //     day,
  //     skip,
  //     limit,
  //     filter,
  //     authorization,
  //   );
  // }

  // @Delete('/doctor-availability/delete/:availabilityId')
  // deleteDoctorAvailabilityById(
  //   @Param('availabilityId') availabilityId: string,
  //   @GetAuthorization() authorization,
  // ) {
  //   return this.appointmentService.deleteDoctorAvailabilityById(
  //     availabilityId,
  //     authorization,
  //   );
  // }

  // all about appointments
  @Post('/register')
  registerAppointment(
    @Body() registerAppointmentDto: RegisterAppointmentDto,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.registerAppointment(
      registerAppointmentDto,
      authorization,
    );
  }

  @Get('/all')
  getAllAppointmentsPerDate(
    @Query('date') date: Date,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.getAllAppointmentsPerDate(
      date,
      authorization,
    );
  }

  @Get('/doctor/mine')
  getMyDoctorAppointments(
    @Query('date') date: Date,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.getMyDoctorAppointments(date, authorization);
  }

  @Get('/patient/all')
  getMyPatientAppointments(@GetAuthorization() authorization) {
    return this.appointmentService.getMyPatientAppointments(authorization);
  }
}
