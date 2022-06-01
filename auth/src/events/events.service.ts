import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor, DoctorDocument } from '../doctor/entities/doctor.entity';
import { Patient, PatientDocument } from '../patient/entities/patient.entity';
import { Model } from 'mongoose';
import { ClientProxy } from '@nestjs/microservices';
import { GetDoctorPatientInformationEventDto } from './dto/get-doctor-patient-information-event.dto';
import { ReturnDoctorPatientInformationEventDto } from './dto/return-doctor-patient-information-event.dto';
import { GetDoctorInformationEventDto } from './dto/get-doctor-information-event.dto';
import { ReturnDoctorInformationEventDto } from './dto/return-doctor-information-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    @InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>,
    @Inject('APPOINTMENT_SERVICE') private appointmentClient: ClientProxy,
  ) {}

  async getDoctorAndPatientInformation(
    data: GetDoctorPatientInformationEventDto,
  ) {
    const doctor = await this.doctorModel.findOne({
      _id: data.doctorId,
    });

    const patient = await this.patientModel.findOne({
      _id: data.patientId,
    });
    // console.log(data);
    // console.log('DOCTOR: ', doctor);
    // console.log('PATIENT: ', patient);
    // console.log('Appointment ID: ', data.appointmentId);
    const returnDoctorPatientInformationEventDto: ReturnDoctorPatientInformationEventDto =
      {
        appointmentId: data.appointmentId,
        doctorLastname: doctor.lastname,
        doctorFirstname: doctor.firstname,
        patientCIN: patient.cin,
        patientBirthday: patient.birthday,
        patientName: `${patient.firstname} ${patient.lastname}`,
      };

    // emit the needed data to the appointment service
    this.appointmentClient.emit(
      'return_doctor_patient_information',
      returnDoctorPatientInformationEventDto,
    );
  }

  async getDoctorInformation(data: GetDoctorInformationEventDto) {
    const doctor = await this.doctorModel.findOne({
      _id: data.doctorId,
    });

    const returnDoctorInformationEventDto: ReturnDoctorInformationEventDto = {
      doctorAvailabilityId: data.doctorAvailabilityId,
      doctorLastname: doctor.lastname,
      doctorFirstname: doctor.firstname,
    };

    // emit the needed data to the appointment service
    this.appointmentClient.emit(
      'return_doctor_information',
      returnDoctorInformationEventDto,
    );
  }
}
