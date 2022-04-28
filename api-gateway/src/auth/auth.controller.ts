import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/doctor/register')
  async registerDoctor(@Body() registerDoctorDto: RegisterDoctorDto) {
    return this.authService.registerDoctor(registerDoctorDto);
  }
}
