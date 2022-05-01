import { Body, Controller, Delete, Param, Post, Query } from '@nestjs/common';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/roles.decorator';
import { PaginationParams } from 'src/pagination-utils/paginationParams';
import { Day } from './days.enum';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';

@Controller('doctor-availability')
export class DoctorAvailabilityController {
  constructor(
    private readonly doctorAvailabilityService: DoctorAvailabilityService,
  ) {}

  @Roles(Role.Nurse, Role.Doctor, Role.Admin)
  @Post('/register')
  registerDoctorAvailability(
    @Body('registerDoctorAvailabilityDto')
    registerDoctorAvailabilityDto: RegisterDoctorAvailabilityDto,
    @Body('payload') payload,
  ) {
    return this.doctorAvailabilityService.registerDoctorAvailability(
      registerDoctorAvailabilityDto,
      payload,
    );
  }

  @Roles(Role.Doctor, Role.Admin)
  @Post('/mine')
  getMyDoctorAvailability(
    @Body('payload') payload,
    @Query('day') day: Day,
    @Query() { skip, limit, filter }: PaginationParams,
  ) {
    console.log('DAY:', day);

    return this.doctorAvailabilityService.getMyDoctorAvailability(
      payload,
      day,
      skip,
      limit,
      filter,
    );
  }

  @Roles(Role.Doctor, Role.Nurse, Role.Admin)
  @Post('/all')
  getAllDoctorAvailabilities(
    @Body('payload') payload,
    @Query('day') day: Day,
    @Query() { skip, limit, filter }: PaginationParams,
  ) {
    console.log('DAY:', day);

    return this.doctorAvailabilityService.getAllDoctorAvailabilities(
      payload,
      day,
      skip,
      limit,
      filter,
    );
  }

  @Delete('/delete/:availabilityId')
  deleteDoctorAvailabilityById(
    @Param('availabilityId') availabilityId: string,
    @Body('payload') payload,
  ) {
    return this.doctorAvailabilityService.deleteDoctorAvailabilityById(
      availabilityId,
      payload,
    );
  }
}
