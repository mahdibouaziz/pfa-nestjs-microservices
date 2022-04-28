import { Body, Controller, Post } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

@Controller('doctor')
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post('/register')
  registerDoctor(@Body() registerDoctorDto: RegisterDoctorDto) {
    return this.doctorService.registerDoctor(registerDoctorDto);
  }

  @Post('/login')
  loginDoctor(@Body() loginDoctorDto: LoginDoctorDto) {
    return this.doctorService.loginDoctor(loginDoctorDto);
  }
}
