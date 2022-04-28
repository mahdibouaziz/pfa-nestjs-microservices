import { Body, Controller, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { LoginPatientDto } from './dto/login-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/register')
  registerPatient(@Body() registerPatientDto: RegisterPatientDto) {
    return this.patientService.registerPatient(registerPatientDto);
  }

  @Post('/login')
  loginPatiet(@Body() loginPatientDto: LoginPatientDto) {
    return this.patientService.loginPatiet(loginPatientDto);
  }
}
