import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { Patient, PatientDocument } from './entities/patient.entity';
import { Model } from 'mongoose';
import { LoginPatientDto } from './dto/login-patient.dto';
import { paginationFuntion } from '../pagination-utils/paginationFunction';
import { Doctor, DoctorDocument } from '../doctor/entities/doctor.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findPatientByCinAndBirthday(cin: string, birthday: Date) {
    const patient = this.patientModel.findOne({
      $and: [{ cin }, { birthday }],
    });
    return patient;
  }

  async registerPatient(registerPatientDto: RegisterPatientDto) {
    // verify the data using the class validator

    let patient;
    // verify the CIN + the Birthday is unique
    patient = await this.findPatientByCinAndBirthday(
      registerPatientDto.cin,
      registerPatientDto.birthday,
    );

    if (patient) {
      throw new ConflictException('This Patient already exists');
    }

    try {
      // verify the doctor id is correct
      const doctor = await this.doctorModel.findById(
        registerPatientDto.associatedDoctor,
      );
      if (!doctor) {
        throw new NotFoundException('Doctor Not Found');
      }
    } catch (error) {
      throw new NotFoundException('Doctor Not Found');
    }

    // create the patient with the necessary fields
    patient = new this.patientModel({
      ...registerPatientDto,
    });
    await patient.save();
    return { message: 'Patient Created', patient };
  }

  async loginPatiet(loginPatientDto: LoginPatientDto) {
    // get the patient
    const patient = await this.findPatientByCinAndBirthday(
      loginPatientDto.cin,
      loginPatientDto.birthday,
    );
    if (!patient) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = {
      cin: patient.cin,
      birthday: patient.birthday,
      patientId: patient._id,
    };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async getAllPatients(pagesToSkip = 0, limitOfDocuments = 15, filter = '') {
    // this must returns: data, totalItems, totalPages
    const searchCriteria = ['firstname', 'lastname', 'cin', 'phone'];
    const result = await paginationFuntion(
      pagesToSkip,
      limitOfDocuments,
      filter,
      searchCriteria,
      this.patientModel,
      'associatedDoctor',
    );

    // console.log(result.data);

    result.data.forEach((element) => {
      element.associatedDoctor = {
        _id: element.associatedDoctor._id,
        firstname: element.associatedDoctor.firstname,
        lastname: element.associatedDoctor.lastname,
        email: element.associatedDoctor.email,
        phone: element.associatedDoctor.phone,
        isAdmin: element.associatedDoctor.isAdmin,
      };
    });
    // console.log(result.data);
    return result;
  }

  async deletePatientById(patientId: string) {
    console.log(patientId);
    try {
      const response = await this.patientModel.deleteOne({ _id: patientId });
      console.log(response);
      if (response.deletedCount == 0) {
        throw new NotFoundException();
      }
      return {
        message: 'Patient deleted',
      };
    } catch (error) {
      console.log(error.data);
      throw new NotFoundException(
        `patient with this ID: ${patientId} not found`,
      );
    }
  }
}
