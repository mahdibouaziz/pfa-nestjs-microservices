import { Controller } from '@nestjs/common';
import { DoctorAvailabilityService } from './doctor-availability.service';

@Controller('doctor-availability')
export class DoctorAvailabilityController {
  constructor(
    private readonly doctorAvailabilityService: DoctorAvailabilityService,
  ) {}
}
