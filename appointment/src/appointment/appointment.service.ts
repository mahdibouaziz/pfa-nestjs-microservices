import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterAppointmentDto } from './dto/register-appointment.dto';
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
    this.authClient.emit('doctor_patient_information', {
      doctorId: registerAppointmentDto.doctorId,
      patientId: registerAppointmentDto.patientId,
      appointmentId: appointment._id,
    });

    return {
      message: 'Appointment created',
      appointment,
    };
  }

  async updateRegistredAppointment(data) {
    const appointment = await this.appointmentModel.findById(
      data.appointmentId,
    );
    // update the appointment
    appointment.doctorLastname = data.data.doctorLastname;
    appointment.patientCIN = data.data.patientCIN;
    appointment.patientBirthday = data.data.patientBirthday;
    appointment.patientName = data.data.patientName;
    await appointment.save();
  }
}
