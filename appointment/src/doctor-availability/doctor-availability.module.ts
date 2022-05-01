import { Module } from '@nestjs/common';
import { DoctorAvailabilityService } from './doctor-availability.service';
import { DoctorAvailabilityController } from './doctor-availability.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DoctorAvailability,
  DoctorAvailabilitySchema,
} from './entities/doctor-availability.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DoctorAvailability.name, schema: DoctorAvailabilitySchema },
    ]),
  ],
  controllers: [DoctorAvailabilityController],
  providers: [DoctorAvailabilityService],
})
export class DoctorAvailabilityModule {}
