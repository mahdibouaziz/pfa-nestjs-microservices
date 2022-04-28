import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { Doctor, DoctorDocument } from './entities/doctor.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async findDoctorByEmail(email: string) {
    const doctor = this.doctorModel.findOne({ email });
    return doctor;
  }

  async registerDoctor(registerDoctorDto: RegisterDoctorDto) {
    let doctor;

    // verify the data using the class validator

    // verify the email is unique
    doctor = await this.findDoctorByEmail(registerDoctorDto.email);
    if (doctor) {
      throw new ConflictException('Doctor with this email already exists');
    }

    // generate the salt and hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(registerDoctorDto.password, salt);

    // create the doctor with the necessary fields
    doctor = new this.doctorModel({
      ...registerDoctorDto,
      salt,
      password: hashedPassword,
    });
    await doctor.save();

    const returnedDoctor = { ...doctor._doc };
    delete returnedDoctor.salt;
    delete returnedDoctor.password;
    return { message: 'Doctor Created', doctor: returnedDoctor };
  }
}
