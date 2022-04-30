import { IsNotEmpty } from 'class-validator';

export class LoginDoctorDto {
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  email: string;
}
