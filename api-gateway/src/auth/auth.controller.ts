import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { GetAuthorization } from '../custom-decorators/get-authorization';
import { PaginationParams } from '../pagination-utils/paginationParams';
import { AuthService } from './auth.service';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { LoginPatientDto } from './dto/login-patient.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';
import { RegisterPatientDto } from './dto/register-patient.dto';
// import { LoginPatientDto } from './dto/login-patient.dto';
// import { RegisterPatientDto } from './dto/register-patient.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/doctor/register')
  async registerDoctor(
    @Body() registerDoctorDto: RegisterDoctorDto,
    @GetAuthorization() authorization,
  ) {
    return this.authService.registerDoctor(registerDoctorDto, authorization);
  }

  @Post('/doctor/login')
  async loginDoctor(
    @Body() loginDoctorDto: LoginDoctorDto,
    @GetAuthorization() authorization,
  ) {
    return this.authService.loginDoctor(loginDoctorDto, authorization);
  }

  @Get('/doctor/all')
  async getAllDoctors(
    @Query() { skip, limit, filter }: PaginationParams,
    @GetAuthorization() authorization,
  ) {
    return this.authService.getAllDoctors(skip, limit, filter, authorization);
  }

  @Delete('/doctor/delete/:doctorId')
  async deleteDoctorById(
    @Param('doctorId') doctorId: string,
    @GetAuthorization() authorization,
  ) {
    return this.authService.deleteDoctorById(doctorId, authorization);
  }

  @Post('/patient/register')
  async registerPatient(
    @Body() registerPatientDto: RegisterPatientDto,
    @GetAuthorization() authorization,
  ) {
    return this.authService.registerPatient(registerPatientDto, authorization);
  }

  @Post('/patient/login')
  async LoginPatient(
    @Body() loginPatientDto: LoginPatientDto,
    @GetAuthorization() authorization,
  ) {
    return this.authService.loginPatient(loginPatientDto, authorization);
  }

  @Get('/patient/all')
  async getAllPatients(
    @Query() { skip, limit, filter }: PaginationParams,
    @GetAuthorization() authorization,
  ) {
    return this.authService.getAllPatients(skip, limit, filter, authorization);
  }

  @Delete('/patient/delete/:patientId')
  async deletePatientById(
    @Param('patientId') patientId: string,
    @GetAuthorization() authorization,
  ) {
    return this.authService.deletePatientById(patientId, authorization);
  }
}
