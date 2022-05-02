import { Body, Controller, Post, Query } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { Role } from 'src/authorization/role.enum';
import { Roles } from 'src/authorization/roles.decorator';
import { Day } from 'src/doctor-availability/days.enum';
import { PaginationParams } from 'src/pagination-utils/paginationParams';
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

  @Roles(Role.Patient)
  @Post('/mine')
  getMyAppointments(
    @Body('payload') payload,
    @Query('day') day: Day,
    @Query() { skip, limit, filter }: PaginationParams,
  ) {
    console.log('DAY:', day);

    return this.appointmentService.getMyAppointments(
      payload,
      day,
      skip,
      limit,
      filter,
    );
  }

  @Roles(Role.Doctor, Role.Nurse, Role.Admin)
  @Post('/all')
  gellAllAppointments(
    @Body('payload') payload,
    @Query('day') day: Day,
    @Query() { skip, limit, filter }: PaginationParams,
  ) {
    return this.appointmentService.gellAllAppointments(
      payload,
      day,
      skip,
      limit,
      filter,
    );
  }
}
