import { Body, Controller, Post } from '@nestjs/common';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/roles.decorator';
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
}
