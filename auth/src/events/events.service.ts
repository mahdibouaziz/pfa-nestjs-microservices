import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor, DoctorDocument } from 'src/doctor/entities/doctor.entity';
import { Patient, PatientDocument } from 'src/patient/entities/patient.entity';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
  ) {}

  async getDoctorAndPatientInformation(data) {
    const doctor = await this.doctorModel.findOne({
      _id: data.doctorId,
    });

    const patient = await this.patientModel.findOne({
      _id: data.patientId,
    });
    // console.log(data);
    console.log('DOCTOR: ', doctor);
    console.log('PATIENT: ', patient);

    // emit the needed data to the appointment service
  }
}
