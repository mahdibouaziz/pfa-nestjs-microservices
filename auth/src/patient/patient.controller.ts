import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { RegisterPatientDto } from './dto/register-patient.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { PaginationParams } from 'src/pagination-utils/paginationParams';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { Role } from 'src/auth/authorization/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller('patient')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Post('/login')
  loginPatiet(@Body() loginPatientDto: LoginPatientDto) {
    return this.patientService.loginPatiet(loginPatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Doctor, Role.Nurse)
  @Post('/register')
  registerPatient(@Body() registerPatientDto: RegisterPatientDto) {
    return this.patientService.registerPatient(registerPatientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Doctor, Role.Nurse)
  @Get('/all')
  getAllPatients(@Query() { skip, limit, filter }: PaginationParams) {
    // this must returns:  totalItems, totalPages, data
    return this.patientService.getAllPatients(skip, limit, filter);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Doctor, Role.Nurse)
  @Delete('/delete/:patientId')
  async deletePatientById(@Param('patientId') patientId: string) {
    return this.patientService.deletePatientById(patientId);
  }
}
