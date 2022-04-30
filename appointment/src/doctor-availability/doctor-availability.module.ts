import { Module } from '@nestjs/common';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { DoctorAvailabilityController } from './doctor-availability.controller';

@Module({
  controllers: [DoctorAvailabilityController],
  providers: [DoctorAvailabilityService],
})
export class DoctorAvailabilityModule {}
