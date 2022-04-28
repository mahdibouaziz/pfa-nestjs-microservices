import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PaginationParams } from 'src/pagination-utils/paginationParams';
import { DoctorService } from './doctor.service';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  registerDoctor(@Body() registerDoctorDto: RegisterDoctorDto) {
    return this.doctorService.registerDoctor(registerDoctorDto);
  }

  @Post('/login')
  loginDoctor(@Body() loginDoctorDto: LoginDoctorDto) {
    return this.doctorService.loginDoctor(loginDoctorDto);
  }

  @Get('/all')
  getAllDoctors(@Query() { skip, limit, filter }: PaginationParams) {
    // this must returns:  totalItems, totalPages, data
    return this.doctorService.getAllDoctors(skip, limit, filter);
  }
}
