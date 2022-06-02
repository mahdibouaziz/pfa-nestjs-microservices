import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DoctorAvailability,
  DoctorAvailabilityDocument,
} from 'src/doctor-availability/entities/doctor-availability.entity';
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
    @InjectModel(DoctorAvailability.name)
    private doctorAvailabilityModel: Model<DoctorAvailabilityDocument>,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
  ) {}

  async registerAppointment(
    registerAppointmentDto: RegisterAppointmentDto,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    payload,
  ) {
    const appointment = new this.appointmentModel(registerAppointmentDto);

    // check if the doctor is available in this day

    const doctorAvailability = await this.doctorAvailabilityModel.find({
      day: new Date(registerAppointmentDto.date).getDay(),
      doctorId: registerAppointmentDto.doctorId,
    });
    console.log('doctorAvailability', doctorAvailability);
    if (doctorAvailability.length < 1) {
      throw new BadRequestException('This Doctor is not available in this day');
    }

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
    appointment.doctorFirstName = data.doctorFirstname;
    appointment.patientCIN = data.patientCIN;
    appointment.patientBirthday = data.patientBirthday;
    appointment.patientName = data.patientName;
    await appointment.save();
  }

  async gellAllAppointments(payload, date: Date) {
    const appointmentsPerDate = await this.appointmentModel.find({
      date: new Date(date),
    });

    const appointmentsPerDayAndDoctor: any = {};

    for (let i = 0; i < appointmentsPerDate.length; i++) {
      if (
        appointmentsPerDayAndDoctor.hasOwnProperty(
          appointmentsPerDate[i].doctorId,
        )
      ) {
        appointmentsPerDayAndDoctor[appointmentsPerDate[i].doctorId] = [
          ...appointmentsPerDayAndDoctor[appointmentsPerDate[i].doctorId],
          appointmentsPerDate[i],
        ];
      } else
        appointmentsPerDayAndDoctor[appointmentsPerDate[i].doctorId] = [
          appointmentsPerDate[i],
        ];
    }

    return appointmentsPerDayAndDoctor;
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
      throw error;
    }
  }

  // getMyPatientAppointments
  async getMyPatientAppointments(payload) {
    const { patientId } = payload;

    try {
      const response = await this.appointmentModel
        .find({
          patientId,
        })
        .sort({ date: 'desc' });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
