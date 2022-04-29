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
import { Role } from 'src/auth/authorization/role.enum';
import { Roles } from 'src/auth/authorization/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { PaginationParams } from 'src/pagination-utils/paginationParams';
import { DoctorService } from './doctor.service';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/login')
  loginDoctor(@Body() loginDoctorDto: LoginDoctorDto) {
    return this.doctorService.loginDoctor(loginDoctorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Post('/register')
  registerDoctor(@Body() registerDoctorDto: RegisterDoctorDto) {
    return this.doctorService.registerDoctor(registerDoctorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Doctor, Role.Nurse)
  @Get('/all')
  getAllDoctors(@Query() { skip, limit, filter }: PaginationParams) {
    // this must returns:  totalItems, totalPages, data
    return this.doctorService.getAllDoctors(skip, limit, filter);
  }

  @UseGuards(JwtAuthGuard)
  @Roles(Role.Admin)
  @Delete('/delete/:doctorId')
  async deleteDoctorById(@Param('doctorId') doctorId: string) {
    return this.doctorService.deleteDoctorById(doctorId);
  }
}
