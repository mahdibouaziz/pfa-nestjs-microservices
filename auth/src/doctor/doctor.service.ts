import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { Doctor, DoctorDocument } from './entities/doctor.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { JwtService } from '@nestjs/jwt';
import { paginationFuntion } from '../pagination-utils/paginationFunction';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findDoctorByEmail(email: string) {
    const doctor = this.doctorModel.findOne({ email });
    return doctor;
  }

  async validateCredentials(loginDoctorDto: LoginDoctorDto): Promise<Doctor> {
    // get the credentials
    const { email, password } = loginDoctorDto;

    //retrive the doctor from the DB
    const doctor = await this.findDoctorByEmail(email);
    if (!doctor) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    //hash the password with the same salt
    const hashedPassword = await bcrypt.hash(password, doctor.salt);
    if (hashedPassword !== doctor.password) {
      throw new UnauthorizedException('Invalid Credentials');
    }

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

  async loginDoctor(loginDoctorDto: LoginDoctorDto) {
    //validate the credentials and if they are invalid throw an error
    const doctor: Doctor = await this.validateCredentials(loginDoctorDto);
    // create the payload and return the access token

    const payload = {
      email: doctor.email,
      type: doctor.type,
      isAdmin: doctor.isAdmin,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async getAllDoctors(pagesToSkip = 0, limitOfDocuments = 15, filter = '') {
    // this must returns: data, totalItems, totalPages
    const searchCriteria = ['firstname', 'lastname', 'email', 'phone'];
    return await paginationFuntion(
      pagesToSkip,
      limitOfDocuments,
      filter,
      searchCriteria,
      this.doctorModel,
    );
  }

  async deleteDoctorById(doctorId: string) {
    // console.log(doctorId);
    try {
      const response = await this.doctorModel.deleteOne({ _id: doctorId });
      // console.log(response);
      if (response.deletedCount == 0) {
        throw new NotFoundException();
      }
      return {
        message: 'Doctor Deleted',
      };
    } catch (error) {
      console.log(error.data);
      throw new NotFoundException(`doctor with this ID: ${doctorId} not found`);
    }
  }
}
