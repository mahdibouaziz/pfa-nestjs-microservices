import { Body, Controller, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Role } from '../authorization/role.enum';
import { Roles } from '../authorization/roles.decorator';
import { AppointmentService } from './appointment.service';
import { RegisterAppointmentDto } from './dto/register-appointment.dto';
import { ReturnDoctorPatientInformationEventDto } from './dto/return-doctor-patient-information-event.dto';

@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Roles(Role.Doctor, Role.Admin, Role.Nurse)
  @Post('/register')
  registerAppointment(
    @Body('registerAppointmentDto')
    registerAppointmentDto: RegisterAppointmentDto,
    @Body('payload') payload,
  ) {
    return this.appointmentService.registerAppointment(
      registerAppointmentDto,
      payload,
    );
  }

  @EventPattern('return_doctor_patient_information')
  async updateRegistredAppointment(
    data: ReturnDoctorPatientInformationEventDto,
  ) {
    // console.log(data);
    return this.appointmentService.updateRegistredAppointment(data);
  }

  @Roles(Role.Doctor, Role.Nurse, Role.Admin)
  @Post('/all')
  gellAllAppointments(@Body('payload') payload, @Query('date') date: Date) {
    return this.appointmentService.gellAllAppointments(payload, date);
  }

  @Roles(Role.Doctor)
  @Post('/doctor/mine')
  getMyDoctorAppointments(@Body('payload') payload, @Query('date') date: Date) {
    return this.appointmentService.getMyDoctorAppointments(payload, date);
  }
}
