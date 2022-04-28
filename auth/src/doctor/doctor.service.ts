import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { Doctor, DoctorDocument } from './entities/doctor.entity';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async registerDoctor(registerDoctorDto: RegisterDoctorDto) {
    console.log(registerDoctorDto);
    const doctor = new this.doctorModel(registerDoctorDto);
    await doctor.save();
    return doctor;
  }
}
