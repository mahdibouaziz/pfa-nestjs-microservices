import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GetAuthorization } from 'src/custom-decorators/get-authorization';
import { PaginationParams } from 'src/pagination-utils/paginationParams';
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
}
