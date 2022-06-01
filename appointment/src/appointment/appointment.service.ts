import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Day } from 'src/doctor-availability/days.enum';
import { paginationFuntion } from '../pagination-utils/paginationFunction';
import { GetDoctorPatientInformationEventDto } from './dto/get-doctor-patient-information-event.dto';
import { RegisterAppointmentDto } from './dto/register-appointment.dto';
import { ReturnDoctorPatientInformationEventDto } from './dto/return-doctor-patient-information-event.dto';
import {
  Appointment,
  AppointmentDocument,
} from './entities/appointment.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  async registerAppointment(
    registerAppointmentDto: RegisterAppointmentDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    payload,
  ) {
    const appointment = new this.appointmentModel(registerAppointmentDto);
    await appointment.save();
    // send an event  (with rabbitMQ) to the auth microservice
    //and tell them that we need to get more information about this doctorId and the patientId
    const getDoctorPatientInformationEventDto: GetDoctorPatientInformationEventDto =
      {
        doctorId: registerAppointmentDto.doctorId,
        patientId: registerAppointmentDto.patientId,
        appointmentId: appointment._id,
      };
    this.authClient.emit(
      'doctor_patient_information',
      getDoctorPatientInformationEventDto,
    );

    return {
      message: 'Appointment created',
      appointment,
    };
  }

  async updateRegistredAppointment(
    data: ReturnDoctorPatientInformationEventDto,
  ) {
    const appointment = await this.appointmentModel.findById(
      data.appointmentId,
    );
    // update the appointment
    appointment.doctorLastname = data.doctorLastname;
    appointment.patientCIN = data.patientCIN;
    appointment.patientBirthday = data.patientBirthday;
    appointment.patientName = data.patientName;
    await appointment.save();
  }

  async gellAllAppointments(
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
    const searchCriteria = [
      'doctorLastname',
      'patientCIN',
      'patientName',
      'type',
    ];

    // console.log('doctorquery', doctorQuery);
    return await paginationFuntion(
      pagesToSkip,
      limitOfDocuments,
      filter,
      searchCriteria,
      this.appointmentModel,
      doctorQuery,
    );
  }

  async getMyDoctorAppointments(payload, date: Date) {
    const { doctorId } = payload;

    try {
      const response = await this.appointmentModel.find({
        doctorId,
        date,
      });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
