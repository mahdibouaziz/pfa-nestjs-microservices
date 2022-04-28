import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { Patient, PatientDocument } from './entities/patient.entity';
import { Model } from 'mongoose';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
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
    // create the patient with the necessary fields
    patient = new this.patientModel({
      ...registerPatientDto,
    });
    await patient.save();
    return { message: 'Patient Created', patient };
  }
}
