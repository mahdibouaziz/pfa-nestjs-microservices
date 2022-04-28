import { Body, Controller, Headers, Post } from '@nestjs/common';
import { GetAuthorization } from 'src/custom-decorators/get-authorization';
import { AuthService } from './auth.service';
import { LoginDoctorDto } from './dto/login-doctor.dto';
import { RegisterDoctorDto } from './dto/register-doctor.dto';

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
}
