import { Body, Controller, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Role } from '../authorization/role.enum';
import { Roles } from '../authorization/roles.decorator';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';
import { ReturnDoctorInformationEventDto } from './dto/return-doctor-information-event.dto';

@Controller('doctor-availability')
export class DoctorAvailabilityController {
  constructor(
    private readonly doctorAvailabilityService: DoctorAvailabilityService,
  ) {}

  @Roles(Role.Doctor, Role.Admin)
  @Post('/register')
  registerDoctorAvailability(
    @Body('registerDoctorAvailabilityDto')
    registerDoctorAvailabilityDto: RegisterDoctorAvailabilityDto,
    @Body('payload') payload,
  ) {
    console.log(registerDoctorAvailabilityDto);
    return this.doctorAvailabilityService.registerDoctorAvailability(
      registerDoctorAvailabilityDto,
      payload,
    );
  }

  @EventPattern('return_doctor_information')
  async updateRegistredDoctorAvailability(
    data: ReturnDoctorInformationEventDto,
  ) {
    return this.doctorAvailabilityService.updateRegistredDoctorAvailability(
      data,
    );
  }

  @Roles(Role.Doctor, Role.Nurse, Role.Admin)
  @Post('/all')
  getAllDoctorAvailabilitiesPerWeekDay(
    @Body('payload') payload,
    @Query('day') day: number,
  ) {
    return this.doctorAvailabilityService.getAllDoctorAvailabilitiesPerWeekDay(
      payload,
      day,
    );
  }

  // @Roles(Role.Doctor, Role.Admin)
  // @Post('/mine')
  // getMyDoctorAvailability(
  //   @Body('payload') payload,
  //   @Query('day') day: Day,
  //   @Query() { skip, limit, filter }: PaginationParams,
  // ) {
  //   console.log('DAY:', day);

  //   return this.doctorAvailabilityService.getMyDoctorAvailability(
  //     payload,
  //     day,
  //     skip,
  //     limit,
  //     filter,
  //   );
  // }

  // @Roles(Role.Doctor, Role.Admin)
  // @Delete('/delete/:availabilityId')
  // deleteDoctorAvailabilityById(
  //   @Param('availabilityId') availabilityId: string,
  //   @Body('payload') payload,
  // ) {
  //   return this.doctorAvailabilityService.deleteDoctorAvailabilityById(
  //     availabilityId,
  //     payload,
  //   );
  // }
}
