import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterDoctorAvailabilityDto } from './dto/register-doctor-availability.dto';
import { Model } from 'mongoose';
import {
  DoctorAvailability,
  DoctorAvailabilityDocument,
} from './entities/doctor-availability.entity';
import { Day } from './days.enum';
import { paginationFuntion } from 'src/pagination-utils/paginationFunction';

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

  async getMyDoctorAvailability(
    payload,
    day: Day,
    pagesToSkip = 0,
    limitOfDocuments = 15,
    filter = '',
  ) {
    let doctorQuery: any = { doctorId: payload.doctorId };
    if (day) {
      doctorQuery = { ...doctorQuery, day };
    }

    // return await this.doctorAvailabilityModel.find(query);
    const searchCriteria = ['type'];

    console.log('doctorquery', doctorQuery);
    return await paginationFuntion(
      pagesToSkip,
      limitOfDocuments,
      filter,
      searchCriteria,
      this.doctorAvailabilityModel,
      doctorQuery,
    );
  }

  async getAllDoctorAvailabilities(
    payload,
    day: Day,
    pagesToSkip = 0,
    limitOfDocuments = 15,
    filter = '',
  ) {
    let doctorQuery: any = {};
    if (day) {
      doctorQuery = { day };
    }

    // return await this.doctorAvailabilityModel.find(query);
    const searchCriteria = ['type'];

    console.log('doctorquery', doctorQuery);
    return await paginationFuntion(
      pagesToSkip,
      limitOfDocuments,
      filter,
      searchCriteria,
      this.doctorAvailabilityModel,
      doctorQuery,
    );
  }
}
