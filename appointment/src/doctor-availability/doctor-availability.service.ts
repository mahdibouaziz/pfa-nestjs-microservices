import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';
import { Model } from 'mongoose';
import {
  DoctorAvailability,
  DoctorAvailabilityDocument,
} from './entities/doctor-availability.entity';

@Injectable()
export class DoctorAvailabilityService {
  constructor(
    @InjectModel(DoctorAvailability.name)
    private doctorModel: Model<DoctorAvailabilityDocument>,
  ) {}

  async registerDoctorAvailability(
    registerDoctorAvailabilityDto: RegisterDoctorAvailabilityDto,
    payload,
  ) {
    registerDoctorAvailabilityDto.doctorId = payload.doctorId;
    const doctorAvailability = new this.doctorModel(
      registerDoctorAvailabilityDto,
    );
    await doctorAvailability.save();
    return {
      message: 'Doctor availability created',
      doctorAvailability,
    };
  }
}
