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
import { PaginationParams } from '../pagination-utils/paginationParams';
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
    return this.appointmentService.registerDoctorAvailability(
      registerDoctorAvailabilityDto,
      authorization,
    );
  }

  @Get('/doctor-availability/mine')
  getMyDoctorAvailability(
    @Query('day') day: string,
    @Query() { skip, limit, filter }: PaginationParams,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.getMyDoctorAvailability(
      day,
      skip,
      limit,
      filter,
      authorization,
    );
  }

  @Get('/doctor-availability/all')
  getAllDoctorAvailabilities(
    @Query('day') day: string,
    @Query() { skip, limit, filter }: PaginationParams,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.getAllDoctorAvailabilities(
      day,
      skip,
      limit,
      filter,
      authorization,
    );
  }

  @Delete('/doctor-availability/delete/:availabilityId')
  deleteDoctorAvailabilityById(
    @Param('availabilityId') availabilityId: string,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.deleteDoctorAvailabilityById(
      availabilityId,
      authorization,
    );
  }

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

  @Get('/doctor/mine')
  getMyDoctorAppointments(
    @Query('date') date: Date,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.getMyDoctorAppointments(date, authorization);
  }

  @Get('/all')
  getAllAppointments(
    @Query('day') day: string,
    @Query() { skip, limit, filter }: PaginationParams,
    @GetAuthorization() authorization,
  ) {
    return this.appointmentService.getAllAppointments(
      day,
      skip,
      limit,
      filter,
      authorization,
    );
  }
}
