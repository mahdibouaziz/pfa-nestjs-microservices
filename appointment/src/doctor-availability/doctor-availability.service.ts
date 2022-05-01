import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';
import { Model } from 'mongoose';
import {
  DoctorAvailability,
  DoctorAvailabilityDocument,
} from './entities/doctor-availability.entity';
import { Day } from './days.enum';

@Injectable()
export class DoctorAvailabilityService {
  constructor(
    @InjectModel(DoctorAvailability.name)
    private doctorAvailabilityModel: Model<DoctorAvailabilityDocument>,
  ) {}

  async registerDoctorAvailability(
    registerDoctorAvailabilityDto: RegisterDoctorAvailabilityDto,
    payload,
  ) {
    registerDoctorAvailabilityDto.doctorId = payload.doctorId;
    const doctorAvailability = new this.doctorAvailabilityModel(
      registerDoctorAvailabilityDto,
    );
    await doctorAvailability.save();
    return {
      message: 'Doctor availability created',
      doctorAvailability,
    };
  }

  async getMyDoctorAvailability(payload, day: Day) {
    let query: any = { doctorId: payload.doctorId };
    if (day) {
      query = { ...query, day };
    }
    return await this.doctorAvailabilityModel.find(query);
  }
}
