import { Body, Controller, Post } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/roles.decorator';
import { AppointmentService } from './appointment.service';
import { RegisterAppointmentDto } from './dto/register-appointment.dto';

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
  async updateRegistredAppointment(data) {
    console.log(data);
    // this.eventsService.getDoctorAndPatientInformation(data);
    return this.appointmentService.updateRegistredAppointment(data);
  }
}
