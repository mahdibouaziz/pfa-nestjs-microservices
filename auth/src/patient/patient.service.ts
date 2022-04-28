import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { Patient, PatientDocument } from './entities/patient.entity';
import { Model } from 'mongoose';
import { LoginPatientDto } from './dto/login-patient.dto';

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

  async loginPatiet(loginPatientDto: LoginPatientDto) {
    // get the patient
    const patient = await this.findPatientByCinAndBirthday(
      loginPatientDto.cin,
      loginPatientDto.birthday,
    );
    if (!patient) {
      throw new UnauthorizedException('Invalid Credentials');
    }

    const payload = { cin: patient.cin, birthday: patient.birthday };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async getAllPatients(pagesToSkip = 0, limitOfDocuments = 15, filter = '') {
    // this must returns: data, totalItems, totalPages
    pagesToSkip = pagesToSkip * limitOfDocuments;
    let query = {};
    filter = filter.toLowerCase().trim();
    if (filter.length > 0) {
      query = {
        $or: [
          { firstname: { $regex: filter, $options: 'i' } },
          { lastname: { $regex: filter, $options: 'i' } },
          { cin: { $regex: filter, $options: 'i' } },
          { phone: { $regex: filter, $options: 'i' } },
        ],
      };
    }

    const data = await this.patientModel
      .find(query)
      .sort({ _id: 1 })
      .skip(pagesToSkip)
      .limit(limitOfDocuments);

    const totalItems = await this.patientModel.count(query);
    const totalPages = Math.round(totalItems / limitOfDocuments);

    return {
      data,
      totalItems,
      totalPages,
    };
  }
}
