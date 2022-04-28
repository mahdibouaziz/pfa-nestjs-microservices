import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PatientService } from './patient.service';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { PaginationParams } from 'src/pagination-utils/paginationParams';

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

  @Get('/all')
  getAllPatients(@Query() { skip, limit, filter }: PaginationParams) {
    // this must returns:  totalItems, totalPages, data
    return this.patientService.getAllPatients(skip, limit, filter);
  }
}
