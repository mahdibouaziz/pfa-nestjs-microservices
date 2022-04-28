import { Body, Controller, Post } from '@nestjs/common';
import { PatientService } from './patient.service';
import { RegisterPatientDto } from './dto/register-patient.dto';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/register')
  registerPatient(@Body() registerPatientDto: RegisterPatientDto) {
    return this.patientService.registerPatient(registerPatientDto);
  }
}
